import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { MailOutlined,EditOutlined, EllipsisOutlined, SettingOutlined  } from "@ant-design/icons";
import { Row, Col, Button, List, Tabs, Menu, Select, Typography, Table, Input, Card, Avatar, PageHeader } from "antd";
import { useQuery, gql } from '@apollo/client';
import { Address } from "../components";
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';
import fetch from 'isomorphic-fetch';

const { Title } = Typography;

const { Option } = Select;

const {Meta} = Card;

  const highlight = { marginLeft: 4, marginRight: 8, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }

function Subgraph(props) {

  function graphQLFetcher(graphQLParams) {
    return fetch(props.subgraphUri, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  const EXAMPLE_GRAPHQL = `
  {
    blogs(first: 25, orderBy: createdAt, orderDirection: desc) {
      id
      title
      content
      createdAt
    }
  }
  `
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL)
  const { loading, error, data } = useQuery(EXAMPLE_GQL,{pollInterval: 2500});

  const blogColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Contents',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'createdAt',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: d => (new Date(d * 1000)).toISOString()
    },
    ];

  const [newBlog, setNewBlog] = useState("loading...");
  const [newTitle, setNewTitle] = useState("loading...");

  const deployWarning = (
    <div style={{marginTop:8,padding:8}}>{"Warning: 🤔 Have you deployed your subgraph yet?"}</div>
  )

  return (
      <>
          <div style={{width:780, margin: "auto", paddingBottom:64}}>

            <div style={{margin:32, textAlign:'center'}}>
            
              <Input size="large" onChange={(e)=>{setNewTitle(e.target.value)}} placeholder="Enter blog title"/>
              <Input size="large" style={{marginTop: "10px"}} onChange={(e)=>{setNewBlog(e.target.value)}} placeholder="Enter blog contents"/>

              <Button className="publish-blog"
               onClick={()=>{
                console.log("New Blog:",newTitle,newBlog)
                /* look how you call setPurpose on your contract: */
                props.tx( props.writeContracts.YourContract.setBlog(newTitle, newBlog) )
                }}
               size="large"
               shape="round"
              >
               <span style={{ marginRight: 8 }} role="img" aria-label="support">
                 🚀
               </span>
               Publish Blog
             </Button>
            </div>
            <div>
            { data ? data.blogs.map(blog => {
              return (
                <Card key={blog.id} className="blog"
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta
                title={blog.title}
                description={blog.content}
              />
            </Card>
              );
            }) : "" 
            } 
            </div> 

          </div>

          <div style={{padding:64}}>
          ...
          </div>
      </>
  );
}

export default Subgraph;
