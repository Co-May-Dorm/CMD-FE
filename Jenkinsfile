pipeline {
	agent any
    stages {
		stage ('Load functions') {      // Define the function files will be used
            steps {
                script {
                    emailFunction = load "Email/emailFunction.groovy"
                }
            }
        }
        stage('Build') { 
            steps {
                sh 'npm install' 
				sh 'npm run build' 
            }
        }
		stage('Deploy') { 
            steps {
				sh 'sudo systemctl enable cmd-fe.service'
				sh 'sudo systemctl stop cmd-fe'
				sh 'sudo systemctl start cmd-fe'
				sh 'sudo systemctl status cmd-fe'
            }
        }
    }
	post ('Send e-mail') {          // Stage for send an email
        always {
                script {
                    emailFunction.emailSendingnoattachment("comaydorm@gmail.com;19130128@st.hcmuaf.edu.vn;adamwilling.2002@gmail.com")       // Define the emails address should be received the mail
                }
        }
    }
}