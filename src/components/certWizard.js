import React, { Component } from 'react';
import { storageBucket } from "../index"
import firebase from 'firebase';

//Unsure if I need access to Redux Store or actions at this stage 
import * as actions from "../actions";
import { connect } from "react-redux";

import CertForm from "./certForm"

class CertWizard extends Component {
    //Internal State
    constructor(props) {
        super(props);
        this.state = {
            selected: "1 of 2",
            uploaded: 0,
            url: "",
            fileName: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.upload = this.upload.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.upload(this.fileInput.files[0]);
    }

    render() {
        // 1st Screen - File Input
        if (this.state.selected === "1 of 2") {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Choose file to upload</label>
                            <input type="file" id="file" name="file" ref={input => {this.fileInput = input;}} />
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )
        }

        if(this.state.selected === "uploading") {
            return (
                <div className="progress-bar">
                    <div className="progress-bar__text">
                        <div className="progress-bar__text--days">
                            {'Upload is ' + this.state.uploaded + '% done'}
                        </div>
                    </div>
                    <div className="progress-bar__bar">
                        <div className="progress-bar__bar--value" style={{width: this.state.uploaded + '%'}}>
                        </div>
                    </div>
                </div>
            )
        }

        if (this.state.selected === "2 of 2") {
            return (
                <CertForm url={this.state.url} fileName={this.state.fileName}/>
            )
        }
    }

    upload(fileInput) {
        let self = this;

        // File or Blob named mountains.jpg
        const file = fileInput

        //Flip Display State to Progress Bar
        this.setState({selected: "uploading"});
        // Save fileName to stat 
        this.setState({fileName: file.name});

        //Root Reference
        var storageRef = storageBucket.ref();
        // Upload file to the object 'UID/`filename`'
        var uploadTask = storageRef.child(`${this.props.user.uid}/` + file.name).put(file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // Sends updated progress to state and in turn the progress bar
            self.setState({uploaded: progress});
            //===============================
            // REMOVE console.log in production
            //===============================
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

            case 'storage/canceled':
            // User canceled the upload
            break;

            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            //===============================
            // REMOVE console.log in production
            //===============================
            console.log('File available at', downloadURL);
            self.setState({selected: "2 of 2", url: downloadURL});
            
        });
        });
    }

}

// ============================================================
//Unsure if I need access to Redux Store or actions at this stage 
function mapStateToProps(state) {
    return {
        intro: state.intro.intro,
        user: state.user,
        dash: state.dash,
        state: state   
    }
}

export default connect(mapStateToProps, actions)(CertWizard);