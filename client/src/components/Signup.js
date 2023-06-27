import React, { useRef, useState } from 'react'

function Signup() {

    let nameInputRef = useRef();
    let mobileNoInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let profilePicInputRef = useRef();

    let [imagePreviewURL, setImagePreviewURL] = useState("./images/profilepic-1.jfif");


    
    let signupToServerUsingFormData = async () => {

                
        let dataToSend = new FormData();
        dataToSend.append("name", nameInputRef.current.value);
        dataToSend.append("mobileNo",mobileNoInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);

        for (let i = 0; i < profilePicInputRef.current.files.length; i++){
            dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
        }
        // dataToSend.append("profilePic", profilePicInputRef.current.files[0]);


        let reqOptions = {
            method: "POST",
            body:dataToSend,            
        }

        let JSONData = await fetch("/signup", reqOptions);

        let JSOData = await JSONData.json();

        console.log(JSOData);
    }
  return (
      <div>
          <form>
              <div>
                  <label>Name</label>
                  <input ref={nameInputRef}></input>
              </div>
              <div>
                  <label>Mobile No.</label>
                  <input ref={mobileNoInputRef}></input>
              </div>
              <div>
                  <label>Age</label>
                  <input ref={ageInputRef}></input>
              </div>
              <div>
                  <label>Email</label>
                  <input ref={emailInputRef}></input>
              </div>
              <div>
                  <label>Password</label>
                  <input ref={passwordInputRef}></input>
              </div>
              <div>
                  <label>Profile Pic</label>
                  <input type='file'
                      ref={profilePicInputRef}
                      onChange={() => {
                      console.log(profilePicInputRef.current.files);

                      let selectedImageURL = URL.createObjectURL(profilePicInputRef.current.files[0]);

                      setImagePreviewURL(selectedImageURL);
                      console.log(selectedImageURL);
                  }}></input>
                  <img id='profilePicPreview' src={imagePreviewURL} alt='profilePic'></img>
              </div>
              
              <div>
                  <button
                      type='button'
                      onClick={() => {
                      signupToServerUsingFormData();
                  }}>Submit FormData</button>
              </div>
          </form>
    </div>
  )
}

export default Signup