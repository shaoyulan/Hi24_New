<?php 
//CHANGE CONTENT TYPE otherwise the "echo json_encode" will return plain text
header('Content-Type: application/json;charset=utf8'); 

include('../DB.php');
// DB object
try{
	$pdo = new PDO("mysql:host={$in[ht]};dbname={$in[dn]};port={$in[pt]};charset={$in[ct]}","{$in[un]}","{$in[pd]}");
	$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
	echo "Database connection failed.";
	exit;
}
// echo $_POST['name'];
// echo $_POST['password'];
// command SQL 
$sql ='INSERT INTO `member`(`country`, `username`, `password`, `firstname`, `lastname`, `addr`, `city`, `postcode`, `email`, `tel`,`shippingAddress`) VALUES (:country,:username,:password,:firstname,:lastname,:addr,:city,:postcode,:email,:tel,:shippingAddress)';
$statement = $pdo->prepare($sql);
foreach ($_POST['memberinfo'] as $key => $value) {
	$str = $value['name'];
	$result= $statement->bindValue($str,$value['value']);
	// print $value['name'].'=>'.$value['value'];
	// echo 
}

$result = $statement->execute();

if($result){
	echo json_encode(['result' => '註冊成功']);
}else{
	echo json_encode(['result' => '註冊失敗']);
}


?>
