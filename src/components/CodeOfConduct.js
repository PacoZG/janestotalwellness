import React from 'react'
import { Link } from 'react-router-dom'

const CodeOfConduct = () => {
  return (
    <div className="min-h-screen pt-22">
      <article className="prose prose-red prose-md md:prose-sm mx-auto max-w-4xl p-2 md:p-5 md:text-justify ">
        <h1>Forum rules and guidelines</h1>
        <h2>There is one guideline than you need to follow</h2>
        <blockquote>
          Be helpful, polite, considerate, and respectful of others, just as you would like others to be.
        </blockquote>
        <h2>Other rules and guidelines</h2>
        <p>
          The remaining rules and guidelines are to maintain order and to let site visitors and members get the most out
          of the site. Forum Rules apply to all forum posts, as well as signatures, Private Messages, Personal Profile
          pages, and any other content you post or provide.
        </p>
        <ol>
          <li>
            <b>Rules:</b> In addition to following these rules, you must observe the{' '}
            <Link to="/terms" target="blank">
              Terms and Conditions
            </Link>{' '}
            that you accepted when you registered.
          </li>
          <li>
            <b>As registered user</b> you can edit and delete your discussions and comments, but not otherwise
          </li>
          <li>
            <b>Courtesy:</b> Treat others with courtesy. Avoid insults, profanity, &quot;shouting&quot; (LIKE THIS!!!),
            racial, ethnic, cultural, or other forms of intolerance, or any form of harassment. Do not purposely provoke
            or annoy other members.
          </li>
          <li>
            <b>On-topic:</b> Keep your posts relevant to the topic of the thread. If if you have a different topic to
            discuss, start a new thread in the appropriate forum.
          </li>
          <li>
            <b>Advertising:</b> Use of the forums for commercial advertising is prohibited, as is using the forums for
            any other form of personal or business profit or gain, or to promote a particular commercial business or
            service. If you want to announce a promote a fundraiser related to bone marrow failure diseases, check with
            an administrator first.
          </li>
          <li>
            <b>Free speech:</b> The rules are not designed to censor opinions or promote the views of the site owners.
            However, keep in mind that you are a guest on a private website, so we reserve the right to remove content
            that interefers with the goals of the site.
          </li>
          <li>
            <b>Re-registration:</b> If your membership is canceled, you may not re-register under another name.
          </li>
          <li>
            <b>Don&lsquo;t </b>create an account just to spam, advertize, insult, troll, or criticize our members and or
            make threads.
          </li>
          <li>
            <b>Don&lsquo;t </b>post sexually explicit content.
          </li>
        </ol>
        <h2>Instant Ban Offenses</h2>
        <p>
          In all cases of Instant Ban offenses, your account will be first suspended while an investigation is done into
          the offense. After an investigation is done (which may only take a few minutes depending on the obviousness of
          your offense), you will be banned. The following are instant ban offenses:
        </p>
        <ol>
          <li>
            Duplicate accounts created to circumvent or break other forum rules, or simply to &quot;agree&quot; with
            your other accounts in a thread.
          </li>
          <li>
            <b>Recruiting</b>othe members to your website/forum, or ask them to buy your product. Do not harass our
            members with advertizing.
          </li>
          <li>
            <b>We reserve the right</b> to ban someone without notification on a case-by-case basis.
          </li>
          <li>
            <b>Don not engage</b> with another member if you noticed he/she as been breaking any rule, please
            communicate with us by sending and email to report.janestotalwellness@gmail.com instead
          </li>
        </ol>
      </article>
    </div>
  )
}

export default CodeOfConduct
