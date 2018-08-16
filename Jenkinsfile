node {
    try {
        stage('Checkout') {
            checkout scm
            notifyBuild('STARTED')
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
                sh 'docker build -t dockerfarm-frontend --no-cache .'
                sh 'docker tag dockerfarm-frontend localhost:5000/dockerfarm-frontend:${BUILD_NUMBER}'
                sh 'docker push localhost:5000/dockerfarm-frontend:${BUILD_NUMBER}'
                sh 'docker rmi -f dockerfarm-frontend localhost:5000/dockerfarm-frontend:${BUILD_NUMBER}'
            }
        }
        stage('Deploy') {
            sh 'docker pull localhost:5000/dockerfarm-frontend:${BUILD_NUMBER}'
            sh 'docker rm -f dockerfarm-frontend || true'
            sh 'docker run -d -p 2000:2000 --restart always --name dockerfarm-frontend localhost:5000/dockerfarm-frontend:${BUILD_NUMBER}'
        }
    } catch (err) {
         currentBuild.result = "FAILED"
        throw err
    } finally {
        notifyBuild(currentBuild.result)
    }
}



/**
 * Send notifications based on build status string
 */
def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus = buildStatus ?: 'SUCCESS'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  def details = """<p>${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESS') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send notifications
  slackSend (color: colorCode, message: summary)

}