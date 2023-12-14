node {
    try {
        stage('Pull from Github') {
            dir('test') {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/sanketsmali03/wdio-sample-bstack'
            }
        }

        stage('Run Test') {
            withEnv(['BROWSERSTACK_USERNAME=USERNAME', 'BROWSERSTACK_ACCESS_KEY=ACCESS_KEY']) {
                dir('test') {
                    sh label: '', returnStatus: true, script: '''#!/bin/bash -l
                                                                npm install
                                                                npm run bstack-single
                                                                '''
                }
            }
        }
    } catch (e) {
        currentBuild.result = 'FAILURE'
        echo e
        throw e
    } finally {
        // Any necessary cleanup or finalization steps can be added here
    }
}
