pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sanketsmali03/wdio-sample-bstack.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Use environment variables set in Jenkins
                sh 'npm run test -- --bstackUser=$BROWSERSTACK_USERNAME --bstackKey=$BROWSERSTACK_ACCESS_KEY'
            }
        }
    }
}
