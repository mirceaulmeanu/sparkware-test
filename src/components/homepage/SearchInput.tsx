import React from "react";
import styled from "styled-components";
import searchiconsvg from "src/icons/search.svg";
import loadinggif from "src/icons/loading.gif";

const Search = styled.div`
    position: relative;
    max-width: 400px;
    margin: 0 auto;
`;

const Input = styled.input`
    padding: 10px 38px 10px 38px;
    border: none;
    outline: none;
    border-bottom: 2px solid black;
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.75);
    &:active, &:focus {
        border-bottom: 2px solid blue;
    }
`;

const Icon = styled.div`
    position: absolute;
    width: 18px;
    height: 18px;
    top: 10px;
    left: 10px;
`;

const Loading = styled.div`
    position: absolute;
    width: 18px;
    height: 18px;
    top: 10px;
    right: 10px;
`;

interface ISearchInputProps {
    loadInProgress?: boolean;
    onChange(ev: React.FormEvent<HTMLInputElement>): void;
    value: string;
    error?: string;
}

export class SearchInput extends React.Component<ISearchInputProps> {
    render() {
        let { loadInProgress, error, ...inputProps } = this.props;
        return <>
            <Search>
                <Icon><img src={ searchiconsvg } alt="" /></Icon>
                <Input type="text" {...inputProps} />
                { loadInProgress ? <Loading><img src={ loadinggif } alt="" style={{width: 18}} /></Loading> : null }
            </Search>
            <div style={{textAlign: "center", fontWeight: 700}}>{ error }</div>
        </>;
    }
}
