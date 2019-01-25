<?php
class SMSHttp{

	var $smsHost;
	var $sendSMSUrl;
	var $getCreditUrl;
	var $batchID;
	var $credit;
	var $processMsg;
	
	function SMSHttp(){
		$this->smsHost = "api.every8d.com";
		$this->sendSMSUrl = "http://".$this->smsHost."/API21/HTTP/sendSMS.ashx";
		$this->getCreditUrl = "http://".$this->smsHost."/API21/HTTP/getCredit.ashx";
		$this->batchID = "";
		$this->credit = 0.0;
		$this->processMsg = "";
	}

	function getCredit($userID, $password){
		$success = false;
		$postDataString = "UID=" . $userID . "&PWD=" . $password;
		$resultString = $this->httpPost($this->getCreditUrl, $postDataString);
		if(substr($resultString,0,1) == "-"){
			$this->processMsg = $resultString;
		} else {
			$success = true;
			$this->credit = $resultString;
		}
		return $success;
	}

	function sendSMS($userID, $password, $subject, $content, $mobile, $sendTime){
		$success = false;
		$postDataString = "UID=" . $userID;
		$postDataString .= "&PWD=" . $password;
		$postDataString .= "&SB=" . $subject;
		$postDataString .= "&MSG=" . $content;
		$postDataString .= "&DEST=" . $mobile;
		$postDataString .= "&ST=" . $sendTime;
		$resultString = $this->httpPost($this->sendSMSUrl, $postDataString);
		if(substr($resultString,0,1) == "-"){
			$this->processMsg = $resultString;
		} else {
			$success = true;
			$strArray = split(",", $resultString);
			$this->credit = $strArray[0];
			$this->batchID = $strArray[4];
		}
		return $success;
	}
	
	function httpPost($url, $postData){
        $result = "";
		$length = strlen($postData);
		$fp = fsockopen($this->smsHost, 80, $errno, $errstr);
		$header = "POST " . $url . " HTTP/1.0\r\n";
		$header .= "Content-Type: application/x-www-form-urlencoded; charset=utf-8\r\n"; 
		$header .= "Content-Length: " . $length . "\r\n\r\n";
		$header .= $postData . "\r\n";
		fputs($fp, $header, strlen($header));
		while (!feof($fp)) {
			$res .= fgets($fp, 1024);
		}
		fclose($fp);
		$strArray = explode("Content-Length: 2", $res); 
		$result = $strArray[1];
        	return $result;

	}
}
