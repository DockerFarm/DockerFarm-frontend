node {
    try {
        stage('Checkout') {
            checkout scm
        }
        stage('Environment') {
            sh 'git --version'
            echo "Branch: ${env.BRANCH_NAME}"
            sh 'docker -v'
            sh 'printenv'
        }
        stage('Build Docker test') {
            echo "Build Docker Test" 
        } 
        stage('Docker test') {
            echo "Dokcer test" 
        }
        stage('Clean Docker test'){
            echo "Clean Docker test"
        }
        stage('Push Image') {
            if(env.BRANCH_NAME == 'master') {
                shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
                sh 'docker build -t dockerfarm-frontend --no-cache .'
                sh 'docker tag dockerfarm-frontend localhost:5000/dockerfarm-frontend'
                sh 'docker push localhost:5000/dockerfarm-frontend'
                sh 'docker rmi -f dockerfarm-frontend localhost:5000/dockerfarm-frontend'
            }
        }
        stage('Deploy') {
            sh 'docker pull localhost:5000/dockerfarm-frontend'
            sh 'docker rm -f dockerfarm-frontend || true'
            sh 'docker run -d -p 2000:2000 --restart always --name dockerfarm-frontend localhost:5000/dockerfarm-frontend'
        }
    } catch (err) {
        throw err
    }
}