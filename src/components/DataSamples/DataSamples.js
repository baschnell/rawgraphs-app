import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { dsv } from 'd3-fetch';
import { autoType } from 'd3-dsv';

const samplesList = [
  {
    'name': 'Movie Data',
    'category': 'Dispersions',
    'url': './sample-datasets/Scatterplot - Highest Grossing Blockbusters of All Time Adjusted for Inflation - data.tsv',
    'delimiter': '\t'
  },
  {
    'name': 'Music Industry',
    'category': 'Lines',
    'url': './sample-datasets/Line graph - RIAA Music format revenues - data.tsv',
    'delimiter': '\t'
  },
  {
    'name': 'Wine Tasting',
    'category': 'Weighted Hierarchies',
    'url': './sample-datasets/Sunburst - Wine Tasting - data.tsv',
    'delimiter': '\t'
  }
]

export default function DataSamples({setData}){
  const select = async (sample)=>{
    const { delimiter, url } = sample;
    const data = await dsv(delimiter, url, autoType);
    const dimensions=data.columns.map(c=>{
      const type = typeof(data[0][c]);
      return {
        name:c,
        type: (type==='object') ? ( (data[0][c] instanceof Date) ? 'date' : undefined) : type
      }
    }
    );
    data.columns=dimensions;
    setData(data);
  }
  return (
    <Row>
      {
        samplesList.map((d,i)=>{
          return (
            <Col xs={3} key={i}>
              <Card onClick={()=>{ select(d) }} className="cursor-pointer">
                <Card.Body className="">
                  <Card.Title className="">
                    <h2 className="">{d.name}</h2>
                  </Card.Title>
                  <Card.Subtitle className="">
                    <h4 className="m-0">{d.category}</h4>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          )
        })
      }
    </Row>
  )
}