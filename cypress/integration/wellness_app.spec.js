describe('Wellness app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000/eng/frontpage')
    const adminUser = {
      username: 'rocky',
      firstName: 'Silvester',
      lastName: 'Stalone',
      email: 'silvester@example.com',
      dateOfBirth: '1965-11-05T00:00:00.000+00:00',
      height: 180,
      weight: 85,
      gender: 'male',
      country: 'United States',
      background: 'cooking, movies, wine',
      goals: 'Wanna be rich like a bitch',
      password: 'superSecret'
    }

    const clientUser = {
      userType: 'client',
      username: 'bruce',
      firstName: 'Bruce',
      lastName: 'Willis',
      email: 'bruce.willis@example.com',
      dateOfBirth: '1976-10-17T00:00:00.000+00:00',
      height: 180,
      weight: 85,
      gender: 'male',
      country: 'United States',
      background: 'cooking, movies, wine',
      goals: 'Wanna feel stronger',
      password: 'superSecret'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', adminUser)
    cy.request('POST', 'http://localhost:3001/api/users/', clientUser)
    cy.visit('http://localhost:3000/eng/frontpage')
  })

  it('front page can be opened', function () {
    cy.contains('Page under construction')
  })

  it('Test app in different languages', function (){
    cy.contains('Page under construction')
    cy.get('#language-menuShow').click()
    cy.get('#FIN').click()
    cy.contains('Sivua rakennetaan')
    cy.get('#language-menuShow').click()
    cy.get('#ESP').click()
    cy.contains('Página en construcción')
    cy.get('#language-menuShow').click()
    cy.get('#ENG').click()
    cy.contains('Page under construction')
  })

  it('Sign up form is shown', function () {
    cy.visit('http://localhost:3000/eng/signUp')
    cy.contains('First name')
    cy.contains('Last name')
    cy.contains('Username')
    cy.contains('Country')
    cy.contains('Email')
    cy.contains('Confirm email')
    cy.contains('Password')
    cy.contains('Confirm password')
    cy.contains('Date of birth')
    cy.contains('Male')
    cy.contains('Female')
    cy.contains('Other')
    cy.contains('Height (cm)')
    cy.contains('Weight (kg)')
    cy.contains('Background')
    cy.contains('Goals')
    cy.contains('Sign up')
  })

  describe('Create a new user', function () {
    it('Succesfully creates a new user', function () {
      cy.visit('http://localhost:3000/eng/signUp')
      cy.contains('Sign up')
      cy.get('#first-name').type('John')
      cy.get('#last-name').type('Wick')
      cy.get('#username').type('wick')
      cy.get('#country-menu').click()
      cy.get('#Italy').click()
      cy.get('#email').type('john.wick@example.com')
      cy.get('#email-confirm').type('john.wick@example.com')
      cy.get('#password').type('1SuperSecret')
      cy.get('#password-confirm').type('1SuperSecret')
      cy.get('#dateOfBirth').type('1976-10-17')
      cy.get('#male').click()
      cy.get('#height').type('185')
      cy.get('#weight').type('87')
      cy.get('#background').type('Lots of movies and stunt work')
      cy.get('#goals').type('Be richer and even more famous')
      cy.get('#signUp-button').click()
      cy.get('#title').contains('Success')
      cy.get('#modal-ok').click()
    })
  })

  describe('User goes to sign in page and...', function () {
    it('fails to login because of wrong credentials', function () {
      cy.visit('http://localhost:3000/eng/signIn')
      cy.contains('Sign in to your account')
      cy.get('#username').type('bruce')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()
      cy.get('#modal-message').contains('Invalid username or password')
      cy.get('#modal-ok').click()
    })

    it('client signs in successfully', function () {
      cy.visit('http://localhost:3000/eng/signIn')
      cy.contains('Sign in to your account')
      cy.get('#username').type('bruce')
      cy.get('#password').type('superSecret')
      cy.get('#login-button').click()
      cy.get('#modal-message').contains('Welcome back bruce, your session will automatically expire in 30 minutes')
      cy.get('#modal-ok').click()
      cy.contains('Page under construction')
    })

    it('Sign in and visit his profile page', function () {
      cy.visit('http://localhost:3000/eng/signIn')
      cy.contains('Sign in to your account')
      cy.get('#username').type('bruce')
      cy.get('#password').type('superSecret')
      cy.get('#login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#user-menu').click()
      cy.get('#profile-button').click()
      cy.get('#user-menu').click()
      cy.contains('Profile')
      cy.contains('Full name')
      cy.contains('Bruce Willis')
      cy.contains('Username')
      cy.contains('bruce')
      cy.contains('bruce.willis@example.com')
      cy.contains('Postal address')
      cy.contains('Not yet provided')
      cy.contains('Country')
      cy.contains('United States')
      cy.contains('Mobile number')
      cy.contains('Not yet provided')
      cy.contains('Background')
      cy.contains('cooking, movies, wine')
      cy.contains('Goals')
      cy.contains('Wanna feel stronger')
      cy.contains('My data')
      cy.contains('Health report')
      cy.contains('Not yet provided')
      cy.contains('Age')
      cy.contains('44 years old')
      cy.contains('Gender')
      // cy.contains('Male')
      cy.contains('Height')
      cy.contains('180 cm')
      cy.contains('Weight')
      cy.contains('85 kg')
      cy.contains('Approximate BMI (Body Mass Index)')
    })

    it('User signs in and edits his/her profile and check changes in the profile page', function () {
      cy.visit('http://localhost:3000/eng/signIn')
      cy.contains('Sign in to your account')
      cy.get('#username').type('bruce')
      cy.get('#password').type('superSecret')
      cy.get('#login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#user-menu').click()
      cy.get('#editProfile-button').click()
      cy.get('#background-button').click()
      cy.get('#health-report').type('The most anthologized poem of the last 25 years for a reason.')
      cy.get('.grid > .cursor-pointer').click()
      cy.get('#save-health-button').click()
      cy.get('#modal-message').contains('Your health information has been successfully updated.')
      cy.get('#modal-ok').click()

      cy.get('#street-address').type('Main Street 6 B')
      cy.get('#postal-code').type('00100')
      cy.get('#city').type('New York')
      cy.get('#mobile').type('09870123456')
      cy.get('#save-personal-info-button').click()
      cy.get('#modal-message').contains('Your profile has been successfully updated.')
      cy.get('#modal-ok').click()

      cy.get('#user-menu').click()
      cy.get('#profile-button').click()
      cy.get('#user-menu').click()
      cy.contains('Postal address')
      cy.contains('Main Street 6 B, 00100, New York')
      cy.contains('Mobile number')
      cy.contains('09870123456')
      cy.contains('My data')
      cy.contains('Health report')
      cy.contains('The most anthologized poem of the last 25 years for a reason.')
    })

    it('User changes password and checks by signing out and signin in with the new password', function () {
      cy.visit('http://localhost:3000/eng/signIn')
      cy.get('#username').type('bruce')
      cy.get('#password').type('superSecret')
      cy.get('#login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#user-menu').click()
      cy.get('#editProfile-button').click()
      cy.get('#user-menu').click()
      cy.get('#oldPassword').type('superSecret')
      cy.get('#oldPasswordConfirm').type('superSecret')
      cy.get('#newPassword').type('secret')
      cy.get('#save-updated-password-button').click()
      cy.get('#modal-message').contains('Your password has been successfully updated, new password will be valid next time you login.')
      cy.get('#modal-ok').click()
      cy.get('#user-menu').click()
      cy.get('#signout-button').click()
      cy.get('#background-button').click()

      cy.visit('http://localhost:3000/eng/signIn')
      cy.get('#username').type('bruce')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.get('#modal-message').contains('Welcome back bruce, your session will automatically expire in 30 minutes')
      cy.get('#modal-ok').click()
      cy.get('#user-menu').click()
      cy.get('#signout-button').click()
      cy.get('#background-button').click()
    })
  })
})