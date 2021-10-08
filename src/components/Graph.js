import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import FlexWrapper from './styled-components/FlexWrapper';
import {
  SelectButton, SelectIcon, StyledLabel, StyledSelect,
} from './styled-components/SelectWrapper';
import { ErrorMessage } from './styled-components/ErrorMessage';
import { GraphContainer, StyledToolTip } from './styled-components/GraphContainer';

const Graph = () => {
  // state variables
  const [selectedOptionPath, setSelectedOption] = useState();
  const [listData, setListData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [showErrorDiv, setShowErrorDiv] = useState(false);
  const [showGraphDiv, setShowGraphDiv] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [graphName, setGraphName] = useState('');

  // fetching list data to be populated in dropdown
  const fetchListData = async () => {
    const res = await fetch('https://vps04.inmation.eu:8002/api/v2/read?identifier=/System/Core/Examples/Assignment', {
      method: 'get',
      headers: new Headers({
        Authorization: `Basic ${Buffer.from(`${process.env.REACT_APP_API_KEY}:${process.env.REACT_APP_API_PASSWORD}`).toString('base64')}`,
        'Content-Type': 'application/json',
      }),
    });
    const listDataFromApi = res.json();
    return listDataFromApi;
  };

  // setting the state of listData (data that needs to be populated in the dropdown)
  useEffect(() => {
    const getListData = async () => {
      const tempListData = [];
      const listDataFromApi = await fetchListData();
      listDataFromApi.data[0].v.forEach((element) => {
        tempListData.push({ value: element.Path, label: `${element.Name}-${element.Description}` });
      });
      setListData(tempListData);
    };
    getListData();
  }, []);

  // fetching the graph data on click of 'Get Graph' button and updating the state of graphData
  const fetchHistoricalData = async () => {
    // checking if path is present
    if (selectedOptionPath !== undefined && selectedOptionPath != null) {
      // setting the grap div to be true and error div to be false
      setShowErrorDiv(false);
      setShowGraphDiv(true);
      let tempGraphData = [];
      const identifier = selectedOptionPath.value;
      const startTime = '2021-01-26T11:00:00Z';
      const endTime = '2021-01-26T12:00:00Z';
      const res = await fetch(`https://vps04.inmation.eu:8002/api/v2/readhistoricaldata?identifier=${identifier
      }&start_time=${startTime}&end_time=${endTime}`, {
        method: 'get',
        headers: new Headers({
          Authorization: `Basic ${Buffer.from(`${process.env.REACT_APP_API_KEY}:${process.env.REACT_APP_API_PASSWORD}`).toString('base64')}`,
          'Content-Type': 'application/json',
        }),
      });
      const response = await res.json();
      if (response !== undefined && response != null && response.data !== undefined
        && response.data != null && response.data.items !== undefined && response.data.items != null
        && response.data.items.length > 0 && response.data.items[0].intervals !== undefined
        && response.data.items[0].intervals.length > 0) {
        setShowErrorDiv(false);
        setShowGraphDiv(true);
        response.data.items[0].intervals.forEach((element) => {
          tempGraphData.push({
            time: format(new Date(element.T), 'MMM, d hh:MM:ss'),
            value: element.V,
            Quantity: element.Q,
          });
        });
        tempGraphData = tempGraphData.sort((a, b) => new Date(a.time) - new Date(b.time));
        setGraphData(tempGraphData);
        setGraphName(selectedOptionPath.label);
      } else {
        setShowErrorDiv(true);
        setShowGraphDiv(false);
      }
    } else {
      setShowErrorDiv(true);
      setShowGraphDiv(false);
    }
  };

  // setting the value of path on selecting a value from the dropdown
  const getSelectedOption = (event) => {
    setSelectedOption(event);
  };

  //   clearing the graph data and
  //   the selected value in the dropdown list to be null after clicking the 'Clear' button
  const clearGraph = () => {
    setTheme('dark');
    setSelectedOption(null);
    setShowGraphDiv(false);
    setGraphData([]);
  };

  // changing the state of theme on changing the value of radio button
  const onChangingTheme = (event) => {
    setTheme(event.target.value);
  };

  // rendering a custom tooltip for the graph
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <StyledToolTip>
          <p className="label">{` Time : ${label}`}</p>
          <p>{`Value : ${payload[0].value}`}</p>
          <p>{`Q : ${payload[0].payload.Quantity}`}</p>
        </StyledToolTip>
      );
    }

    return null;
  };

  // defining prop types for custom tooltip
  CustomTooltip.propTypes = {
    active: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    payload: PropTypes.array.isRequired,
    // eslint-disable-next-line react/require-default-props
    label: PropTypes.string,
  };

  // rendering content
  return (
    <>
      <FlexWrapper direction="row" justify="flex-start">
        <div>
          <StyledLabel paddingTop="120px">
            Select data to display
          </StyledLabel>
          <StyledSelect
            className="basic-single"
            classNamePrefix="select"
            options={listData}
            onChange={getSelectedOption}
            value={selectedOptionPath}
          />
        </div>
        <SelectButton background="#1e90ff" onClick={fetchHistoricalData}>
          Get Graph
          {' '}
          <SelectIcon><FaIcons.FaAngleRight /></SelectIcon>
        </SelectButton>
        <SelectButton background="red" onClick={clearGraph}>
          Clear Graph
          <SelectIcon><FaIcons.FaTimes /></SelectIcon>
        </SelectButton>
      </FlexWrapper>
      {!showGraphDiv && showErrorDiv
      && <ErrorMessage>No graph found. Please try with valid data.</ErrorMessage>}
      { graphData.length > 0 && showGraphDiv && !showErrorDiv
      && <FlexWrapper>
        <StyledLabel paddingTop="40px" decoration="underline">
          Graph of
          {' '}
          {graphName}
          {' '}
        </StyledLabel>
        <div onChange={onChangingTheme}>
          <input type="radio" value="dark" name="theme" defaultChecked />
          {' '}
          Dark
          <input type="radio" value="light" name="theme" />
          {' '}
          Light
        </div>
        <GraphContainer
          width={1000}
          height={400}
          background={theme}
        >
          <AreaChart
            data={graphData}
          >
            <Area
              dataKey="value"
              type="monotone"
              tickFormatter={(str) => {
                const date = parseISO(str);
                return format(date, 'MMM, d');
              }}
            />
            <XAxis dataKey="time" />
            <YAxis dataKey="value" />
            <Tooltip content={CustomTooltip} />
            <CartesianGrid strokeDasharray="3 3" />
          </AreaChart>
        </GraphContainer>
      </FlexWrapper> }
    </>
  );
};

export default Graph;
