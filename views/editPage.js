const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}">

  <div class="form-group">
  <label for="title" class="col-sm-2 control-label">Author Name</label>
  <div class="col-sm-10">
    <input id="name" name="name" type="text" class="form-control" value=${author.name}/>
  </div>
</div>

<div class="form-group">
  <label for="title" class="col-sm-2 control-label">Author Email</label>
  <div class="col-sm-10">
    <input id="email" name="email" type="text" class="form-control" value=${author.email}/>
  </div>
</div>

<div class="form-group">
<label for="title" class="col-sm-2 control-label">Page Title</label>
<div class="col-sm-10">
  <input id="title" name="title" type="text" class="form-control" value=${page.title}/>
</div>
</div>

<div class="form-group">
<label for="title" class="col-sm-2 control-label">Content</label>
<div class="col-sm-10">
  <textarea name="content">${page.content}</textarea>
</div>
</div>

<div class="form-group">
<label for="title" class="col-sm-2 control-label">Status</label>
<div class="col-sm-10" value=${page.status}>
  <select name="status">
    <option>open</option>
    <option>close</option>
  </select>
</div>
</div>

    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
    </div>
  </form>
`);
