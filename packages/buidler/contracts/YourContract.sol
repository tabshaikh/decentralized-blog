pragma solidity >=0.6.0 <0.7.0;

import "@nomiclabs/buidler/console.sol";

contract YourContract {
    event SetBlog(address sender, string title, string content);

    constructor() public {
        // what should we do on deploy?
    }

    function setBlog(string memory title, string memory content) public {
        emit SetBlog(msg.sender, title, content);
    }
}
