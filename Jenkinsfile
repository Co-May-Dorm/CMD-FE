pipeline {
	agent any
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
				sh 'systemctl enable cmd-fe.service'
				sh 'systemctl stop cmd-fe'
				sh 'systemctl start cmd-fe'
				sh 'systemctl status cmd-fe'
            }
        }
    }
}