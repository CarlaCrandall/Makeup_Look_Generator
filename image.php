<?php
	//set image dimensions
	$width = 450;
	$height = 315;

	//store image layers in array
	$layers = array();

	foreach($_POST['layer'] as $layer){
		$layers[] = imagecreatefrompng($layer);
	}

	//create new transparent image
	$image = imagecreatetruecolor($width, $height);
	imagefill($image, 0, 0, imagecolorallocatealpha($image, 255, 255, 255, 127));
	imagealphablending($image, true);
	imagesavealpha($image, true);

	//add layers to image
	for ($i = 0; $i < count($layers); $i++) {
		imagecopyresampled($image, $layers[$i], 0, 0, 0, 0, $width, $height, $width, $height);
	}

	//output the merged image
	header('Content-Disposition: Attachment;filename=MakeupLook.png'); 
	header('Content-type: image/png');
	imagepng($image);
	imagedestroy($image);
?>