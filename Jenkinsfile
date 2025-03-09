pipeline {
    agent { label 'docker' } // or your node name if you didn't set a label

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'testing',
                    url: 'https://github.com/aymane-drif/app-gluescribe.git',
                    credentialsId: 'github-credentials'
            }
        }
        stage('Build & Deploy') {
            steps {
                // Docker Compose commands
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }
}
