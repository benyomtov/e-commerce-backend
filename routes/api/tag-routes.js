const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: { model: ProductTag }
      }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      const tagData = await Tag.findByPk(req.params.id, {
        include: [{
          model: Product,
          through: { model: ProductTag }
        }]
      });
      if (!tagData) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTag = await Tag.findByPk(req.params.id);
      res.status(200).json(updatedTag);
    } else {
      res.status(400).json({ message: 'No tag found with this id!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deleted) {
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ message: 'No tag found with this id!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
