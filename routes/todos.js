const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.post('/', todoController.create);
router.get('/', todoController.show);
router.get('/:id', todoController.index);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.destroy);

module.exports = router;