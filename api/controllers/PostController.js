/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async find(req, res) {
    const query = {};
    let page = 1;
    let per = 10;
    if (req.query.page) {
      page = req.query.page * 1;
    }
    if (req.query.per) {
      per = req.query.per * 1;
    }
    if (req.query.name) {
      query.name = { contains: req.query.name }; // 模糊匹配
    }
    if (req.query.is_checked) {
      query.isChecked = req.query.is_checked;
    }
    if (req.query.forum) {
      query.forum = req.query.forum;
    }
    //
    const total = await Post.count(query); // 查询数量
    // 查询数据
    const data = await Post.find(query)
      .skip((page - 1) * per)
      .limit(per)
      .populate("forum")
      .populate("user")
      .populate("comments")
      .sort("id DESC");
    // const result = await sails.helpers.page(Article, query);
    res.json({
      code: 1,
      total,
      pages: Math.ceil(total / per),
      data,
    });
  },
  // 帖子审核
  async check(req, res) {
    await Post.update({
      id: {
        in: req.body.ids,
      },
    }).set({
      isChecked: req.body.isChecked,
    });
    res.json({
      code: 1,
      msg: "审核成功",
    });
  },
  async deleteMany(req, res) {
    await Post.destroy({
      id: {
        id: req.body.ids,
      },
    });
    res.json({
      code: 1,
      msg: "删除成功",
    });
  },
};
