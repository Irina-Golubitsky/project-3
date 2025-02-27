import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { DELETE_EVENT } from '../../utils/mutations';
import { useQuery } from '@apollo/react-hooks';
import {  QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const ShowTable= props => {
    // const { loading, data } = useQuery( QUERY_ME, {    
    // });
    // const user = data?.me || {};
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    // if (!Auth.loggedIn()) {
    //   return (
    //     <h4 class="login-error">
    //       You need to be logged in to see this. Use the navigation links above to sign up or log in!
    //     </h4>
    //   );
    // }
    const [deleteEvent, { error }] = useMutation(DELETE_EVENT);
    const deleteEventBtn = async event => {
        event.preventDefault();
        const start= event.target.getAttribute('data-start');
        const end= event.target.getAttribute('data-end');
        const student= event.target.getAttribute('data-student');
        const comment= event.target.getAttribute('data-comment');
      
        try {
          await deleteEvent({
            variables: {
              userId: props.userId,
              day: props.day,
              start: start,
              end:end,
              student:student,
              comment:comment
            }
          });
        } catch (e) {
          console.error(e);
        }

      }
    


  return (

<div class="col-xl-3 col-md-6 d-flex mt-4 mb-2 mt-md-0" data-aos="zoom-in" data-aos-delay="100">
    <div class="icon-box">
              <div class="icon"><i class="bx bxl-dribbble"></i></div>
              <h4>{props.day}</h4>
             
              {props.events.filter(event => (event.day===props.day)).map( dayevent => (
                <p> {dayevent.start} - {dayevent.end} {dayevent.student} {dayevent.comment} 
                <button
                    className="tablebtn"
                    data-start={dayevent.start}
                    data-end={ dayevent.end}
                    data-student= {dayevent.student}
                    data-comment={dayevent.comment}
                    onClick={deleteEventBtn}
                    > 
                    ✗
                  </button> 
        
                </p>
                ))} 
              </div>
              </div>
             
         
     
  )
};

export default ShowTable;
