// SPDX-License-Identifier:MIT
pragma solidity >=0.8.2 <0.9.0;
contract Donation{
    struct Data{
        string name;
        uint money;
        string message;
        uint time;
        address from;
    } Data [] Datas;
    address payable  owner;
    constructor(){
        owner = payable ( msg.sender);
    }
    function send(string memory name, string memory message) public  payable {
       uint money=msg.value;
        require(money>0,"Please Send Money Greater than 0");
        owner.transfer(money);
        Datas.push(Data(name,money,message,block.timestamp,msg.sender));
    }
    function getData(address add) view public returns (Data[] memory){
        require(add==owner,"You are not owner of this Donation NGO");
        return Datas;
    }
function getowner() public view returns(address){
    return owner;
}
}