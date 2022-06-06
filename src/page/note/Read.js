import React, { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { getCookie } from "../../tools/cookie"
import config from '../../config'
import { useParams, Link } from 'react-router-dom';

const Read = () => {

  let { id } = useParams()
  let [getState, setState] = useState({})

  const getRead = async () => {

    const json = JSON.stringify({});
    let t = getCookie("USER_TOKEN")
    const res = await axios.post(config.backend + `note/read/${id}`, json, {
      headers: {
        'Content-Type': 'application/json',
        'Token': t
      }
    });

    if (res.data.status) {
      setState({ title: res.data.title, html: res.data.html, edit: res.data.edit })
    } else {
      setState({
        title: "Post Not Found!", html: `
        <a class="link" href="/note">Click Here go to Home</a>
      ` })
    }

  }

  useEffect(() => {
    getRead()
  }, [])

  return (
    <>
      <div className='con'>
        <div className='d-flex note-hade'>
          <p className='note-title'>{getState.title}</p>
          {(() => {
            if (getState.edit) {
              return (
                <Link className='m-y-auto' to={"/note/edit/" + id}><i class="bi bi-pencil edit-icon"></i></Link>
              )
            }
          })()}
        </div>
        <hr />
        <div className='html-body' dangerouslySetInnerHTML={{ __html: getState.html }}>
        </div>
      </div>
    </>
  )

}

export default Read