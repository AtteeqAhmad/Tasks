import _taskService from '../services/TaskService'
import _listService from '../services/ListService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'


//Public
export default class ListsController {
      constructor() {
            this.router = express.Router()
                  .use(Authorize.authenticated)
                  .get('', this.getAll)
                  .get('/:id', this.getById)
                  .get('/:id/tasks/', this.getTasksByListId)
                  .post('', this.create)
                  .put('/:id', this.edit)
                  .delete('/:id', this.delete)
                  .use(this.defaultRoute)
      }

      defaultRoute(req, res, next) {
            next({ status: 404, message: 'No Such Route' })
      }

      async getAll(req, res, next) {
            try {
                  let data = await _listService.find({ authorId: req.session.uid })
                  return res.send(data)
            }
            catch (err) { next(err) }
      }


      async getById(req, res, next) {
            try {
                  let data = await _listService.findOne({ _id: req.params.id, authorId: req.session.uid })
                  return res.send(data)
            } catch (error) { next(error) }
      }


      async getTasksByListId(req, res, next) {
            try {
                  let data = await _taskService.find({ listId: req.params.id, authorId: req.session.uid })
                  return res.send(data)
            } catch (error) { next(error) }
      }


      async create(req, res, next) {
            try {
                  req.body.authorId = req.session.uid
                  let data = await _listService.create(req.body)
                  return res.status(201).send(data)
            } catch (error) { next(error) }
      }

      async edit(req, res, next) {
            try {
                  let data = await _listService.findOneAndUpdate(
                        { _id: req.params.id, authorId: req.session.uid }
                        , req.body, { new: true })
                  if (data) {
                        return res.send(data)
                  }
                  throw new Error("invalid id")
            } catch (error) { next(error) }
      }

      async delete(req, res, next) {
            try {
                  await _listService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
                  return res.send("Successfully Deleted")
            } catch (error) { next(error) }
      }
}