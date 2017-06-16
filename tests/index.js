'use strict';

const Parser = require( '../dist/parser.js' );
const chai = require( 'chai' );
const expect = chai.expect;

describe( 'Parser', () => {
	it( 'is a function', () => {
		expect( Parser ).to.be.a( 'function' );
	} );
} );
