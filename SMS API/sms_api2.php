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

header('Content-Type: application/json; charset=utf8');

include('../../sms_info/sms_info.php');
// include('SMSHttp.php');

	$return="";
	$sms = new SMSHttp();
	$userID=$account['account'];	//發送帳號
	$password=$account['password'];	//發送密碼

	$subject = "php test";	//簡訊主旨，主旨不會隨著簡訊內容發送出去。用以註記本次發送之用途。可傳入空字串。
    	$content = "test";	//簡訊內容
    	$mobile = $_POST['phone_number'] || "";	//接收人之手機號碼。格式為: +886912345678或09123456789。多筆接收人時，請以半形逗點隔開( , )，如0912345678,0922333444。
    	$sendTime= "";		//簡訊預定發送時間。-立即發送：請傳入空字串。-預約發送：請傳入預計發送時間，若傳送時間小於系統接單時間，將不予傳送。格式為YYYYMMDDhhmnss；例如:預約2009/01/31 15:30:00發送，則傳入20090131153000。若傳遞時間已逾現在之時間，將立即發送。
	
    //取餘額

    if($sms->getCredit($userID,$password)){
    	// echo "取得餘額成功，餘額為：" . $sms->credit . "<br />";
    	$GLOBALS['return']= $sms->credit;
    } else {
    	// echo "取得餘額失敗，" . $sms->processMsg . "<br />";
    	$GLOBALS['return']= $sms->processMsg;
    }
	
	//傳送簡訊
	// if($sms->sendSMS($userID,$password,$subject,$content,$mobile,$sendTime)){
	// 	echo "傳送簡訊成功，餘額為：" . $sms->credit . "，此次簡訊批號為：" . $sms->batchID . "<br />";
	// } else {
	// 	echo "傳送簡訊失敗，" . $sms->processMsg . "<br />";
	// }

    // $verify_num="";
    // for ($i=1; $i <=4 ; $i++) { 
    // 	$verify_num .= rand(0,9);
    // }

    // echo json_encode($_POST['verify_num']);
	echo json_encode(["balance"=>$return]);