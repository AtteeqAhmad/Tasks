import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
      title: { type: String, required: true },
      authorId: { type: ObjectId, ref: 'User', required: true },
      boardId: { type: ObjectId, ref: 'Board', required: true },
      listId: { type: ObjectId, ref: 'List', required: true }
}, { timestamps: true })

// CASCADE ON DELETE 

_schema.pre('deleteMany', function (next) {
      //lets find all the tasks and remove them
      Promise.all([
            //_taskServic.deleteMany({ taskId: 
            //this._conditions_id }),
      ])
            .then(() => next())
            .catch(err => next(err))
})


_schema.pre('findOneAndRemove', function (next) {
      Promise.all([

      ])
            .then(() => next())
            .catch(() => next(err))
})

export default mongoose.model('Task', _schema)