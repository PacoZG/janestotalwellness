import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/index'
import ReactMarkdown from 'react-markdown'
import { createBlog } from '../../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const author = useField('text')
  const content = useField('text')

  const handleCreateBlog = () => {
    const blog = {
      author: author.params.value,
      content: content.params.value,
    }
    console.log('BLOG: ', blog)
    dispatch(createBlog(blog))
  }

  const reset = () => {
    author.reset()
    content.reset()
  }
  return (
    <div
      className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
    from-gray-300 via-white to-gray-200 "
    >
      <div
        className="prose prose-red prose-md md:prose-sm mx-auto max-w-5xl p-5 pb-5 shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
    from-gray-300 via-white to-gray-200 "
      >
        <h3>Author: {author.params.value}</h3>
        <h3 className="border-b-2 border-gray-400 pb-2 ">Content</h3>
        {content.params.value.length > 0 ? (
          <ReactMarkdown>{content.params.value}</ReactMarkdown>
        ) : (
          <h2 className="text-center">You will see your blog here once your start typing</h2>
        )}

        <div className="flex flex-col space-y-1 border-t-2 pt-2 border-gray-400">
          <label className="edit-form-label">Author</label>
          <input {...author.params} className="editform-input" />
          <label className="edit-form-label">Content</label>
          <textarea
            {...content.params}
            className="h-24 md:h-40 block border focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full rounded-md p-2 text-sm placeholder-gray-200"
          />
          <div className="flex px-3 py-2 bg-gray-400 text-right rounded-b-sm space-x-2">
            <button
              onClick={reset}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:bg-gray-400 focus-within:outline-none focus-within:ring-1 "
            >
              Clear fields
            </button>
            <button
              onClick={handleCreateBlog}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
              bg-gray-500 text-sm text-white hover:bg-gray-400 focus-within:outline-none focus-within:ring-1"
            >
              Post blog
            </button>
          </div>
        </div>
      </div>
      <div
        className=" mx-auto max-w-5xl p-5 pb-5 shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
    from-gray-300 via-white to-gray-200"
      >
        <p>
          Here you can find a list of easy symbols that you can use to format your blog automatically, make sure to
          leave one empty line before using a different formatting symbol:
        </p>
        <br></br>
        <div>
          <b>Headers</b>
          <br></br> # H1 <br></br> ## H2<br></br> ### H3<br></br> #### H4<br></br> ##### H5<br></br> ###### H6<br></br>
          <b>Alternatively, for H1 and H2, an underline-ish style:</b>
          <br></br>
          Alt-H1<br></br>
          ======<br></br>
          Alt-H2<br></br>
          ------<br></br>
          <b>Emphasis</b>
          <br></br>
          Emphasis, aka italics, with *asterisks* or _underscores_.<br></br>
          Strong emphasis, aka bold, with **asterisks** or __underscores__.<br></br>
          Combined emphasis with **asterisks and _underscores_**.<br></br>
          Strikethrough uses two tildes. ~~Scratch this.~~<br></br>
          1. First ordered list item 2. Another item<br></br>
          ⋅⋅* Unordered sub-list. <br></br>
          1. Actual numbers don&lsquo;t matter, just that it&lsquo;s a number<br></br>
          ⋅⋅1. Ordered sub-list<br></br>
          4. And another item.<br></br>
          <br></br>
          ⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading
          spaces (at least one, but we&lsquo;ll use three here to also align the raw Markdown).<br></br>
          <br></br>
          <br></br>
          <b># Unordered list</b>
          <br></br>
          <br></br>* Unordered list can use asterisks<br></br>- Or minuses<br></br>+ Or pluses<br></br>
          <br></br>+ Create a list by starting a line with `+`, `-`, or `*`<br></br>+ Sub-lists are made by indenting 2
          spaces:<br></br>&nbsp;&nbsp;- Marker character change forces new list start:<br></br>&nbsp;&nbsp;&nbsp;&nbsp;*
          Ac tristique libero volutpat at
          <br></br>&nbsp;&nbsp;&nbsp;&nbsp;+ Facilisis in pretium nisl aliquet<br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Nulla volutpat aliquam velit
          <br></br>+ Very easy!<br></br>
          <br></br>
          <b># Blockquotes</b>
          <br></br>
          {'> blockquote _italic text_'}
          <br></br>
          {'>> blockquote **bold text**'}
          <br></br>
          {'>>> blockquote normal text'}
          <br></br>
          <br></br>
          <b>Links</b>
          <br></br>
          {'[I am an inline-style link](https://www.google.com)'}
          <br></br>
          <br></br>
          {'[I am an inline-style link with title](https://www.google.com "Google\'s Homepage")'}
          <br></br>
          <br></br>
          {'[I am a reference-style link][Arbitrary case-insensitive reference text]'}
          <br></br>
          <br></br>
          {'[I am a relative reference to a repository file](../blob/master/LICENSE)'}
          <br></br>
          <br></br>
          {'[You can use numbers for reference-style link definitions][1]'}
          <br></br>
          <br></br>
          Or leave it empty and use the [link text itself].<br></br>
          <br></br>
          URLs and URLs in angle brackets will automatically get turned into links. <br></br>
          {'http://www.example.com or <http://www.example.com> and sometimes'} <br></br>
          {'example.com (but not on Github, for example)'}.<br></br>
          <br></br>
          Some text to show that the reference links can follow later.<br></br>
          <br></br>
          [arbitrary case-insensitive reference text]: https://www.mozilla.org<br></br>
          [1]: http://slashdot.org<br></br>
          [link text itself]: http://www.reddit.com<br></br>
        </div>
      </div>
    </div>
  )
}

export default Blog
