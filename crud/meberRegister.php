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


$sql = 'SELECT `id`, `firstname`, `lastname` FROM `member` WHERE `country`=:country AND `username`=:username AND `password`=:password AND `firstname`=:firstname AND `lastname`=:lastname AND `addr`=:addr AND `city`=:city AND `postcode`=:postcode AND `email`=:email AND `tel`=:tel AND `shippingAddress`=:shippingAddress';

// $sql = 'SELECT `id` FROM `member` WHERE `username`=:username';
$statement = $pdo->prepare($sql);
foreach ($_POST['memberinfo'] as $key => $value) {
	// if($value['name'] == 'username')
	$str = $value['name'];
	$result= $statement->bindValue($str,$value['value']);
}

$result_id = $statement->execute();
$userid = $statement->fetchAll(PDO::FETCH_ASSOC);



if($result && $result_id){
	echo json_encode(['result' => $userid]);
}else{
	echo json_encode(['result' => $userid]);
}


?>
