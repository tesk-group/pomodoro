# Acceptance Testing

## Register

### Preconditions
None

### Procedure
| Step | Test Scenario | Expected Results | Status (Pass/Fail) | Comments |
| ---- | ------------- | ---------------- | ------------------ | -------- |
| 1    | Click on Register button | The register form shall appear including text boxes to fill out name, email, and password | Pass |  |
| 2    | Fill out each of the fields in the form, and then click on the Register New Account button | A message confirming the account was successfully registerd shall appear | Pass |  |
| 3    | Acknowledge the message | The user shall be redirected to the login page | Pass |  |

## Log In

### Preconditions
1. Test user is already registered

### Procedure
| Step | Test Scenario | Expected Results | Status (Pass/Fail) | Comments |
| ---- | ------------- | ---------------- | ------------------ | -------- |
| 1    | Enter the email address and password, and then click the Log In button | The user shall be redirected to the pomodoro page and show the username on the upper right corner |  |  |
| 2    | Click on the Log Out button | The user shall be redirected to the log in page | Pass |  |

## Pomodoro Timer

### Preconditions
1. Test user is registered and signed in
2. Test user has a linked Trello account

### Procedure
| Step | Test Scenario | Expected Results | Status (Pass/Fail) | Comments |
| ---- | ------------- | ---------------- | ------------------ | -------- |
| 1    | Sync tasks from Kanban Board | Imported tasks shall be displayed | Pass |  |
| 2    | Select a task from the list | The task shall appear selected | Pass |  |
| 3    | Click the play button on the timer | The timer starts the countdown | Pass |  |
| 4    | Click the pause button on the timer | The timer countdown stops, and a pop-up message appears prompting for the reason for pausing the timer | Pass |  |
| 5    | Write the reaosn in the pop-up message and click the OK button | The pop-up message disappears, and the timer continues paused | Pass |  |
| 6    | Click the play button on the timer | The countdown continues from where it left off | Pass |  |
| 7    | The timer countdown finishes | A message should appear indicating "Break time!" |  |  |
