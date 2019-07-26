import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


let _schema = new Schema({
      title: { type: String, required: true },
      authorId: { type: ObjectId, ref: 'User', required: true },
      listId: { type: ObjectId, ref: 'list', required: true },
      taskId: { type: ObjectId, ref: 'task', required: true }
}, { timestamps: true })


_schema.pre('deleteMany', function (next) {
      Promise.all([

      ])
            .then(() => next())
            .catch(err => next(err))
})


_schema.pre('findOneAndRemove', function (next) {
      Promise.all([

      ])
            .then(() => next())
            .catch(err => next(err))
})

export default mongoose.model('Comment', _schema)