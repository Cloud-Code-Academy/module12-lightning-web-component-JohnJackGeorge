import { LightningElement, track } from 'lwc';

const devFundamentalsWeighting = .23;
const procAutoLogicWeighting = .30;
const userInterfaceWeighting = .25;
const testDebugDeploymentWeighting = .22;
const passingScore = 68;
    
export default class PlatformDevCertCalculator extends LightningElement {

    devFundamentalsScore = 50;
    procAutoLogicScore = 50;
    userInterfaceScore = 50;
    testDebugDeploymentScore = 50;

    certificationScore = 90;
    numberOfQuestions = 60;

    currentHistoryId = 0;

    showResources = false;
    showGoodJob = false;

    attemptHistory = [
        {Id: 1, Score: 50},
        {Id: 2, Score: 25},
        {Id: 3, Score: 75},
        {Id: 4, Score: 100}
    ];

    calculateScore() {
        let devFundamentalsScore = this.devFundamentalsScore * devFundamentalsWeighting;
        let procAutoLogicScore   = this.procAutoLogicScore * procAutoLogicWeighting;
        let userInterfaceScore   = this.userInterfaceScore * userInterfaceWeighting;
        let testDebugDeploymentScore = this.testDebugDeploymentScore * testDebugDeploymentWeighting;

        this.certificationScore= devFundamentalsScore + procAutoLogicScore + userInterfaceScore + testDebugDeploymentScore;
        
        this.shoeResourceIfFailed();
        this.addAttemptHistory(this.certificationScore);
    }

    handleChange(event) {
    
        const inputName = event.target.name;

        let value = Number(event.target.value);
        switch (inputName) {
            case 'devFundamentals':
                this.devFundamentalsScore = value;
                break;
            case 'procAutoLogic':
                this.procAutoLogicScore = value;
                break;
            case 'userInterface':
                this.userInterfaceScore = value;
                break;
            case 'testDebugDeployment':
                this.testDebugDeploymentScore = value;
                break;
            default:
                console.log('No match found for inputName');
        }
    }

    shoeResourceIfFailed() {
        if (this.certificationScore < passingScore) {
            this.showResources = true;
        } else {
            this.showResources = false;
        }
        this.showGoodJob = !this.showResources;
    }

    /**
     * Adds a new attempt to the attemptHistory array.
     *
     * @param {number} Score - The score of the new attempt.
     */
    addAttemptHistory(Score) {
        this.currentHistoryId ++;
        const attempt = 
            {
                Id: this.currentHistoryId, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(event) {
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
    }

    connectedCallback() {
        this.currentHistoryId = this.attemptHistory.length;
    }
}