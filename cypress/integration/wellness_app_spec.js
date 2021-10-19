describe('Wellness app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000/home')
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
      password: 'superSecret',
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
      password: 'superSecret',
    }

    cy.request('POST', 'http://localhost:3001/api/users/', adminUser)
    cy.request('POST', 'http://localhost:3001/api/users/', clientUser)
    cy.visit('http://localhost:3000/home')
  })

  it('front page can be opened', function () {
    cy.contains('Welcome to Jane Total Wellness app') // temporary test
  })

  describe('First our visibility and basic functionality', function () {
    it('Test app in different languages', function () {
      cy.contains('Welcome to Jane Total Wellness app')
      cy.get('#language-menuShow').click()
      cy.get('#FIN').click()
      cy.contains('Tervetuloa Jane Total Wellness -sovellukseen')
      cy.get('#language-menuShow').click()
      cy.get('#ESP').click()
      cy.contains('Bienvenido a la aplicación Jane Total Wellness')
      cy.get('#language-menuShow').click()
      cy.get('#ENG').click()
      cy.contains('Welcome to Jane Total Wellness app')
    })

    it('check different pages visibility', function () {
      // temporary test, will expand over time
      cy.get('#salon').click()
      cy.contains('Welcome to Jane‘s Salon')
    })

    it('Sign up form is shown', function () {
      cy.visit('http://localhost:3000/signUp')
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
      cy.contains('SIGN UP')
    })
  })

  describe('Create a new user', function () {
    it('Succesfully creates a new user', function () {
      cy.get('#user-menu').click()
      cy.get('#signup-button').click()
      cy.contains('SIGN UP')
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
      cy.get('#terms-and-conditions').click()
      cy.get('#subscribe-button').click()
      cy.get('#title').contains('Success')
      cy.get('#modal-ok').click()
    })
  })

  describe('User goes to sign in page and...', function () {
    it('...fails to login because of wrong credentials', function () {
      cy.visit('http://localhost:3000/signIn')
      cy.contains('Sign in to your account')
      cy.get('#username').type('bruce')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()
      cy.get('#modal-message').contains('Invalid username or password')
      cy.get('#modal-ok').click()
    })

    it('...signs in successfully', function () {
      cy.get('#user-menu').click()
      cy.get('#signin-button').click()
      cy.contains('Sign in to your account')
      cy.get('#username').type('bruce')
      cy.get('#password').type('superSecret')
      cy.get('#login-button').click()
      cy.get('#modal-message').contains('Welcome back bruce, your session will automatically expire in 30 minutes')
      cy.get('#modal-ok').click()
      cy.contains('Welcome to Jane Total Wellness app')
    })
  })

  describe('The user...', function () {
    beforeEach('...signs in and...', function () {
      cy.get('#user-menu').click()
      cy.get('#signin-button').click()
      cy.contains('Sign in to your account')
      cy.get('#username').type('bruce')
      cy.get('#password').type('superSecret')
      cy.get('#login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#user-menu').click()
    })

    it('...visit his/her profile page', function () {
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
      cy.contains(' years old')
      cy.contains('Gender')
      cy.contains('Height')
      cy.contains('180 cm')
      cy.contains('Weight')
      cy.contains('85 kg')
      cy.contains('Approximate BMI (Body Mass Index)')
    })

    it('...edits his/her profile and check changes in the profile page', function () {
      cy.get('#editprofile-button').click()
      cy.get('#health-report').type('The most anthologized poem of the last 25 years for a reason.')
      cy.get('.grid > .cursor-pointer').click()
      cy.get('#save-health-button').click()
      cy.get('#modal-message').contains('Your health information has been successfully updated')
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
      cy.contains('Postal address')
      cy.contains('Main Street 6 B, 00100, New York')
      cy.contains('Mobile number')
      cy.contains('09870123456')
      cy.contains('My data')
      cy.contains('Health report')
      cy.contains('The most anthologized poem of the last 25 years for a reason.')
    })

    it('...changes password and checks by signing out and signin in with the new password', function () {
      cy.get('#editprofile-button').click()
      cy.get('#oldPassword').type('superSecret')
      cy.get('#oldPasswordConfirm').type('superSecret')
      cy.get('#newPassword').type('secret')
      cy.get('#save-updated-password-button').click()
      cy.get('#modal-message').contains(
        'Your password has been successfully updated, new password will be valid next time you login'
      )
      cy.get('#modal-ok').click()
      cy.get('#user-menu').click()
      cy.get('#signout-button').click()

      cy.visit('http://localhost:3000/signIn')
      cy.get('#username').type('bruce')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.get('#modal-message').contains('Welcome back bruce, your session will automatically expire in 30 minutes')
      cy.get('#modal-ok').click()
      cy.get('#user-menu').click()
      cy.get('#signout-button').click()
    })
  })

  describe('Checking admins accessibility', function () {
    beforeEach('When an admin logs in...', function () {
      cy.visit('http://localhost:3000/signIn')
      cy.get('#username').type('rocky')
      cy.get('#password').type('superSecret')
      cy.get('#login-button').click()
      cy.get('#modal-message').contains('Welcome back rocky')
      cy.get('#modal-ok').click()
    })

    it('...the clients tab can be visible and accessible', function () {
      cy.contains('My Clients')
      cy.get('#myclients').click()
      cy.get('#client-link').click()
      cy.contains('Update biometrics')
      cy.contains('Make a new note')
    })

    it('...makes a new note on the clients page', function () {
      cy.get('#myclients').click()
      cy.get('#client-link').click()
      cy.get('#web-content').type('Moonlight as we enter the New Brunswick woods, hairy, scratchy, splintery')
      cy.get('#web-saveNote').click()
      cy.get('#modal-message').contains('Note has been added')
      cy.get('#modal-ok').click()
      cy.get('#show-note').click()
      cy.contains('Moonlight as we enter the New Brunswick woods,')
    })

    it('...the note can be updated', function () {
      cy.get('#myclients').click()
      cy.get('#client-link').click()
      cy.get('#web-content').type('Moonlight as we enter the New Brunswick woods, hairy, scratchy, splintery')
      cy.get('#web-saveNote').click()
      cy.get('#modal-ok').click()
      cy.get('#show-note').click()
      cy.get('#web-updateNote').click()
      cy.get('#web-aditContent').type('Note has to be updated right away')
      cy.get('#web-saveUpdate').click()
      cy.get('#modal-message').contains('Note has been updated')
      cy.get('#modal-ok').click()
      cy.get('#show-note').click()
    })

    it('...the note can be deleted', function () {
      cy.get('#myclients').click()
      cy.get('#client-link').click()
      cy.get('#web-content').type('Moonlight as we enter the New Brunswick woods, hairy, scratchy, splintery')
      cy.get('#web-saveNote').click()
      cy.get('#modal-ok').click()
      cy.get('#show-note').click()
      cy.get('#web-deleteNote').click()
    })
  })

  describe('Testing forum functionality as a visitor', function () {
    beforeEach(function () {
      cy.get('#salon').click()
      cy.get('#show-menu-button').click()
      cy.get('#topic-menu').click()
      cy.get('#Exercise').click()
      cy.get('#author-discussion-input').type('Micheal Jackson')
      cy.get('#title-discussion-input').type('Can I see the dark side of the moon?')
      cy.get('#content-discussion-input').type(
        "There's nothing wrong don't be bothered they said It's just childish fantasies..."
      )
      cy.get('#post-discussion-button').click()
      cy.get('#modal-ok').click()
    })

    it('Shows the welcome text', function () {
      cy.contains('Welcome to Jane‘s Salon')
    })

    it('We can create a new discussion', function () {
      cy.contains('Micheal Jackson')
      cy.contains('0 comments')
    })

    it('The discussion can be liked', function () {
      cy.get('#like-discussion').click()
      cy.contains('1')
    })

    it('The discussion can be disliked', function () {
      cy.get('#dislike-discussion').click().click()
      cy.contains('2')
    })

    it('We can see the content of the discussion', function () {
      cy.get('#show-discussion').click()
      cy.contains("There's nothing wrong don't be bothered ")
    })

    it('We can make a comment in the discussion and like it', function () {
      cy.get('#show-discussion').click()
      cy.get('#show-comments-button').click()
      cy.contains('No comments yet')
      cy.get('#show-comment-input').click()
      cy.get('#comment-author-input').type('Eddie')
      cy.get('#comment-content-input').type('It is really scary')
      cy.get('#post-comment-button').click()
      cy.contains('It is really scary')
      cy.contains('1 comment')
      cy.get('#like-comment').click()
      cy.contains('1')
      cy.contains('0 replies')
    })

    it('We ca reply to the comment', function () {
      cy.get('#show-discussion').click()
      cy.get('#show-comments-button').click()
      cy.get('#show-comment-input').click()
      cy.get('#comment-author-input').type('Eddie')
      cy.get('#comment-content-input').type('It is really scary')
      cy.get('#post-comment-button').click()
      cy.get('#show-replies-button').click()
      cy.contains('No replies')
      cy.get('#show-reply-fields-button').click()
      cy.get('#author-reply-input').type('Micheal')
      cy.get('#content-reply-input').type('Yes it is')
      cy.get('#submit-reply-button').click()
      cy.contains('1 reply')
      cy.contains('Yes it is')
    })
  })

  describe('Testing forum functionality as a user', function () {
    beforeEach(function () {
      cy.get('#salon').click()
      cy.get('#show-menu-button').click()
      cy.get('#forum-username-input').type('bruce')
      cy.get('#forum-password-input').type('superSecret')
      cy.get('#salon-login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#salon').click()
      cy.get('#topic-menu').click()
      cy.get('#Exercise').click()
      cy.get('#title-discussion-input').type('Can I see the dark side of the moon?')
      cy.get('#content-discussion-input').type(
        "There's nothing wrong don't be bothered they said It's just childish fantasies..."
      )
      cy.get('#post-discussion-button').click()
      cy.get('#modal-ok').click()
    })

    it('Shows the welcome text', function () {
      cy.contains('Welcome to Jane‘s Salon')
    })

    it('We can create a new discussion', function () {
      cy.contains('bruce')
      cy.contains('0 comments')
    })

    it('The discussion can be liked', function () {
      cy.get('#like-discussion').click()
      cy.contains('1')
    })

    it('The discussion can be disliked', function () {
      cy.get('#dislike-discussion').click().click()
      cy.contains('2')
    })

    it('We can see the content of the discussion', function () {
      cy.get('#show-discussion').click()
      cy.contains("There's nothing wrong don't be bothered ")
    })

    it('We can make a comment in the discussion and like it', function () {
      cy.get('#show-discussion').click()
      cy.get('#show-comments-button').click()
      cy.contains('No comments yet')
      cy.get('#show-comment-input').click()
      cy.get('#comment-content-input').type('It is really scary')
      cy.get('#post-comment-button').click()
      cy.contains('It is really scary')
      cy.contains('1 comment')
      cy.get('#like-comment').click()
      cy.contains('1')
      cy.contains('0 replies')
    })

    it("We ca reply to the comment, but can't edit or delete comment", function () {
      cy.get('#show-discussion').click()
      cy.get('#show-comments-button').click()
      cy.get('#show-comment-input').click()
      cy.get('#comment-content-input').type('It is really scary')
      cy.get('#post-comment-button').click()
      cy.get('#show-replies-button').click()
      cy.contains('No replies')
      cy.get('#user-menu').click()
      cy.get('#signout-button').click()
      cy.get('#salon').click()
      cy.get('#show-menu-button').click()
      cy.get('#forum-username-input').type('rocky')
      cy.get('#forum-password-input').type('superSecret')
      cy.get('#salon-login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#salon').click()
      cy.get('#show-discussion').click()
      cy.get('#show-comments-button').click()
      cy.get('#show-reply-fields-button').click()
      cy.get('#content-reply-input').type('Yes it is')
      cy.get('#submit-reply-button').click()
      cy.contains('1 reply')
      cy.contains('Yes it is')
      cy.contains('rocky')
    })
  })

  describe('Testing forum functionality as an admin', function () {
    beforeEach(function () {
      cy.get('#salon').click()
      cy.get('#show-menu-button').click()
      cy.get('#forum-username-input').type('rocky')
      cy.get('#forum-password-input').type('superSecret')
      cy.get('#salon-login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#salon').click()
      cy.get('#topic-menu').click()
      cy.get('#Exercise').click()
      cy.get('#title-discussion-input').type('Can I see the dark side of the moon?')
      cy.get('#content-discussion-input').type(
        "There's nothing wrong don't be bothered they said It's just childish fantasies..."
      )
      cy.get('#post-discussion-button').click()
      cy.get('#modal-ok').click()
    })

    it('Can delete user comments', function () {
      cy.get('#user-menu').click()
      cy.get('#signout-button').click()
      cy.get('#salon').click()
      cy.get('#show-menu-button').click()
      cy.get('#forum-username-input').type('bruce')
      cy.get('#forum-password-input').type('superSecret')
      cy.get('#salon-login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#salon').click()
      cy.get('#show-discussion').click()
      cy.get('#show-comments-button').click()
      cy.get('#show-comment-input').click()
      cy.get('#comment-content-input').type('It is really scary')
      cy.get('#post-comment-button').click()
      cy.get('#user-menu').click()
      cy.get('#signout-button').click()
      cy.get('#salon').click()
      cy.get('#show-menu-button').click()
      cy.get('#forum-username-input').type('rocky')
      cy.get('#forum-password-input').type('superSecret')
      cy.get('#salon-login-button').click()
      cy.get('#modal-ok').click()
      cy.get('#salon').click()
      cy.get('#show-discussion').click()
      cy.get('#show-comments-button').click()
      cy.get('#delete-comment-button').click()
      cy.contains('No comments yet')
      cy.get('#delete-discussion-button').click()
      cy.get('#salon').click()
      cy.contains('No discussion have been created yet')
    })
  })
})
