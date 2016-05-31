<?php

class Token {
	
	private $usersID;
	private $username;

	public $tokenId;
	public $issuedAt;
	public $notBefore;
	public $expire;
	public $issuer;
	
	public $data;
	
	public function __construct($usersID, $username) {
		$this->usersID = $usersID;
		$this->username = $username;
		$this->tokenId = base64_encode(mcrypt_create_iv(32));
		$this->issuedAt = time();
		$this->notBefore = $this->issuedAt;
		$this->expire = $this->notBefore + 60;            // Adding 60 seconds
		$this->issuer = 'ocelot';
		$this->data = [
			'iat'  => $this->issuedAt,         // Issued at: time when the token was generated
			'jti'  => $this->tokenId,          // Json Token Id: an unique identifier for the token
			'iss'  => $this->issuer,       // Issuer
			'nbf'  => $this->notBefore,        // Not before
			'exp'  => $this->expire,           // Expire
			'data' => [                  // Data related to the signer user
			'userId'   => $this->usersID, // userid from the users table
			'userName' => $this->username, // User name
			]
		];
	}
}
?>