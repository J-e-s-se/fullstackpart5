describe('Blog app', function() {
  beforeEach(function() {   
    console.log('before resetting') 
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {      
      name: 'Falz Man',     
      username: 'falzbadman98',      
      password: '298ei09{fz}'    
    }

    cy.request('POST', 'http://localhost:3003/api/users', user) 

    cy.visit('http://localhost:3000')  
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('falzbadman98')    
      cy.get('#password').type('298ei09{fz}', {parseSpecialCharSequences: false})    
      cy.get('#login-button').click()
      cy.contains('Falz Man logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('falzbadman98')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe('when logged in', function() {    
    beforeEach(function() {
      cy.login({username: 'falzbadman98', password: '298ei09{fz}'})
    })

    it('a new blog can be created', function() {     
      cy.createBlog({title: 'Get Rich Quick', author: 'Rich Dad', url: 'www.richdad.com'})
      cy.contains('Get Rich Quick Rich Dad')
    })  

    it('users can like a blog', function() {
      cy.createBlog({title: 'Get Rich Quick', author: 'Rich Dad', url: 'www.richdad.com'})

      cy.contains('Get Rich Quick Rich Dad').as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('@theBlog').contains('likes 0')
      cy.get('@theBlog').get('#likebutton').click()
      cy.get('@theBlog').contains('likes 1')

    })

    it('user who created a blog can delete it', function() {
      cy.createBlog({title: 'Get Rich Quick', author: 'Rich Dad', url: 'www.richdad.com'})
      cy.contains('Get Rich Quick Rich Dad').as('theBlog')
      cy.listBlogs()

      cy.get('@theBlog').contains('view').click()
      cy.get('@theBlog').contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.listBlogs()

      console.log('delete completed')
      cy.visit('http://localhost:3000')
      // cy.contains('Get Rich Quick Rich Dad')
    })

    
    it('blog with most likes is ordered first', function() {
      cy.createBlog({title: 'Learn touch typing', author: 'Ben Heck', url: 'www.typing.com', likes: 5})
      cy.createBlog({title: 'Cook good food', author: 'Flay Bean', url: 'www.food.com', likes: 8})

      cy.get('.blog').eq(0).should('contain', 'Cook good food Flay Bean')
      cy.get('.blog').eq(1).should('contain', 'Learn touch typing Ben Heck')
    })
  })
})