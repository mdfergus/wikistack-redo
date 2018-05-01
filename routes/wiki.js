const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')

const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')

module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll()
    res.send(main(pages))
  } catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const page = new Page(req.body)

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    await page.save()
    page.setAuthor(user)

    res.redirect(`/wiki/${page.slug}`)
  } catch (error) {
        next(error)
    }
})
router.get('/add', (req, res, next) => {
  res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug

  try {
    const page = await Page.findOne({
      where: {
        slug
      }
    })
    if(page === null) {
      res.sendStatus(404)
    }
    const author = await page.getAuthor()
    res.send(wikiPage(page, author))
  }
  catch (error) {
    next(error)
  }
})

router.post('/:slug', async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    })
    res.redirect(`/wiki/${updatedPages[0].slug}`)
  }
  catch (error) {
    next(error)
  }
})

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    if (page === null) {
      res.sendStatus404
    }
    else {
      const author = await page.getAuthor()
      res.send(editPage(page, author))
    }
  }
  catch (error){
    next(error)
  }
})

router.get('/:slug/delete', async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    })
    res.redirect('/wiki')
  } catch (error) {
    next(error)
  }
})
