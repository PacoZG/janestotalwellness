import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/index'
import ReactMarkdown from 'react-markdown'
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import imageService from '../../services/images'

const CreateBlog = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const author = useField('text')
  const content = useField('text')
  const title = useField('text')
  // handle image and health info information
  // eslint-disable-next-line
  const [imageMessage, setImageMessage] = useState(null)
  const [selectedFile, setSelecteFile] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageInput = event => {
    event.preventDefault()
    const image = event.target.files[0]
    if (image.size > 3000000) {
      setImageMessage(t('EditForm.ImageWarning'))
    } else {
      setImageMessage(t('EditForm.ImageRequirement'))
    }
    setSelecteFile(image)
    previewImage(image)
  }

  const previewImage = img => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
  }

  const handleCreateBlog = async event => {
    event.preventDefault()
    let image
    if (imagePreview) {
      const data = new FormData()
      data.append('image', selectedFile)
      try {
        image = await imageService.postImage(data)
      } catch (error) {
        console.log('ERROR: ', error.response.data)
      }
      console.log('IMAGE: ', image)
      const blog = {
        title: title.params.value,
        author: author.params.value,
        content: content.params.value,
        imageURL: image.url,
        imageID: image.cloudinaryId,
      }
      console.log('BLOG: ', blog)
      dispatch(createBlog(blog))
      dispatch(
        setNotification({
          message: t('Blog.Posted'),
          title: 'Sucess',
          show: true,
        })
      )
      setImagePreview(null)
      author.reset()
      title.reset()
      content.reset()
    }
  }

  const reset = () => {
    author.reset()
    title.reset()
    content.reset()
  }
  return (
    <div
      className="min-h-screen pt-22 shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
    from-gray-300 via-white to-gray-200 "
    >
      <Transition
        show={true}
        enter="transition transform duration-500 ease-out"
        enterFrom="-translate-y-10 opacity-0"
        enterTo="-translate-y-0 opacity-100"
      >
        <div
          className="prose prose-red prose-sm md:prose-sm mx-auto max-w-5xl p-3 md:p-5 md:pb-5 shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
    from-gray-300 via-white to-gray-200"
        >
          <h3 className="border-b-2 border-gray-400 pb-2 pl-2 md:pl-0 md:text-center text-xl ">
            {t('Blog.Author') + author.params.value}{' '}
          </h3>
          <h1>{title.params.value}</h1>
          <div className="flex flex-col items-center justify-center">
            {imagePreview ? (
              <div className="flex flex-col flex-grow items-center ">
                <label className="text-sm font-medium text-gray-700">{t('EditForm.PhotoLabel')}</label>
                <img
                  src={imagePreview}
                  alt="chosen"
                  className="inline-block h-60 w-auto md:h-96 md:w-auto overflow-hidden rounded-sm shadow-lg border-2 border-black m-4 p-3"
                />
                <p className="text-xs text-gray-500 pt-2 w-auto">{t('EditForm.ImageRequirement')}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium text-gray-700">{t('EditForm.PhotoLabel')}</label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-32 w-32 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-xs text-gray-500 w-auto">{t('EditForm.ImageRequirement')}</p>
              </div>
            )}
            <div className="">
              <label
                className="transition duration-500 cursor-pointer bg-gray-500 border-white border-2 hover:bg-gray-400 px-3 py-2 h-30 w-auto rounded-md
                text-xs text-white md:w-auto md:text-base"
              >
                <span>{selectedFile ? t('EditForm.ImgBtnLabel_2') : t('EditForm.ImgBtnLabel_1')}</span>
                <input
                  id="blog-image-input"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageInput}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          {content.params.value.length > 0 || title.params.value.length > 0 ? (
            <div className="md:pl-16 md:pr-16 text-justify">
              <ReactMarkdown>{content.params.value}</ReactMarkdown>
            </div>
          ) : (
            <h2 className="text-center">{t('Blog.Instructions')}</h2>
          )}
          <div className="flex flex-col space-y-1 border-t-2 pt-2 border-gray-400">
            <label className="edit-form-label -mb-1">{t('Blog.Author')}</label>
            <input id="blog-author-input" {...author.params} className="editform-input" />
            <label className="edit-form-label">{t('Blog.Title')}</label>
            <input id="blog-title-input" {...title.params} className="editform-input" />
            <label className="edit-form-label">{t('Blog.Content')}</label>
            <textarea
              id="blog-content"
              {...content.params}
              className="h-24 md:h-40 block border focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full rounded-md p-2 text-sm placeholder-gray-200"
            />
            <div className="px-3 py-2 bg-gray-400 text-right rounded-b-sm space-x-2">
              <button onClick={reset} className="buttons-web">
                {t('Blog.Clear')}
              </button>
              <button id="create-post" onClick={handleCreateBlog} className="buttons-web">
                {t('Blog.Post')}
              </button>
            </div>
          </div>
        </div>
        <div
          className=" mx-auto max-w-5xl p-3 md:p-5 md:pb-5 shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
    from-gray-300 via-white to-gray-200"
        >
          <p>
            Here you can find a list of easy symbols that you can use to format your blog automatically, make sure to
            leave one empty line before using a different formatting symbol:
          </p>
          <br></br>
          <div>
            <b>## Headers</b>
            <br></br> # H1 <br></br> ## H2<br></br> ### H3<br></br> #### H4<br></br> ##### H5<br></br> ###### H6
            <br></br>
            <b>Alternatively, for H1 and H2, an underline-ish style:</b>
            <br></br>
            Alt-H1<br></br>
            ======<br></br>
            Alt-H2<br></br>
            ------<br></br>
            <b>## Emphasis</b>
            <br></br>
            Emphasis, aka italics, with *asterisks* or _underscores_.<br></br>
            Strong emphasis, aka bold, with **asterisks** or __underscores__.<br></br>
            Combined emphasis with **asterisks and _underscores_**.<br></br>
            1. First ordered list item<br></br> 2. Another item<br></br>* Unordered sub-list. <br></br>
            1. Actual numbers don&lsquo;t matter, just that it&lsquo;s a number<br></br>
            ⋅⋅⋅1. Ordered sub-list<br></br>
            4. And another item.<br></br>
            <br></br>
            ⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading
            spaces (at least one, but we&lsquo;ll use three here to also align the raw Markdown).<br></br>
            <br></br>the dot (⋅) represents one space
            <br></br>
            <br></br>
            <b>## Unordered list</b>
            <br></br>
            <br></br>* Unordered list can use asterisks<br></br>- Or minuses<br></br>+ Or pluses<br></br>
            <br></br>+ Create a list by starting a line with `+`, `-`, or `*`<br></br>+ Sub-lists are made by indenting
            2 spaces:<br></br>&nbsp;&nbsp;- Marker character change forces new list start:<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;* Ac tristique libero volutpat at
            <br></br>&nbsp;&nbsp;&nbsp;&nbsp;+ Facilisis in pretium nisl aliquet<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Nulla volutpat aliquam velit
            <br></br>+ Very easy!<br></br>
            <br></br>
            <b>## Blockquotes</b>
            <br></br>
            {'> blockquote _italic text_'}
            <br></br>
            {'>> blockquote **bold text**'}
            <br></br>
            {'>>> blockquote normal text'}
            <br></br>
            <br></br>
            <b>## Links</b>
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
      </Transition>
    </div>
  )
}

export default CreateBlog
