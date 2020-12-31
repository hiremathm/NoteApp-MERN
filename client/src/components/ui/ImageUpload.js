import React,{ useRef, useState, useEffect } from 'react'

import '../css/ImageUpload.css'
import Button from './Button'
const ImageUpload = props => {

	const [file, setFile] = useState()
	const [previewUrl, setPreviewUrl] = useState()
	const [isValid, setIsValid] = useState(false)

	const filePcikRef = useRef()

	useEffect(() => {
		if(!file){
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		}

		fileReader.readAsDataURL(file)

	},[file])

	const pickImageHandler = () => {
		filePcikRef.current.click()
	}

	const imageChangeHandler = (event) => {
		let pickedImage ;
		let fileIsValid = false
		if(event.target.files && event.target.files.length === 1){
			pickedImage = event.target.files[0]
			fileIsValid = true
			setFile(pickedImage)
			setIsValid(true)
			// return;
		}else{
			setIsValid(false)
			fileIsValid = false
		}

		// console.log('image values', props.id, pickedImage, fileIsValid)
		props.onInput(props.id, pickedImage, fileIsValid)
	}

	return (
		<div className = "">
			<input 
				type="file"
				style = {{display: 'none'}}
				id = {props.id}
				accept=".jpg,.jpeg,.png"
				ref={filePcikRef}
				onChange = {imageChangeHandler}
			/>

			<div className={`image-upload ${props.center && 'center'}`}>
				<div className="image-upload__preview">
					{previewUrl && <img 
						src={previewUrl} 
						alt="preview"
					/>}

					{!previewUrl && <p>Please pick an image.</p>}

				</div>
				<Button type ="button" size = "small" onClick={pickImageHandler}>Upload Image</Button>
			</div>
			{!isValid && <p>{props.errorText}</p>}
		</div>
	)
}

export default ImageUpload;