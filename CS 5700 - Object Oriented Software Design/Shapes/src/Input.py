# Jonathan Petersen
# A01236750
# Shapes Assignment
# Input Class

import json
import os
import unittest
import xml.etree.ElementTree as xml

class Input:
	def readFile(self, filename):
		return self.strategy(open(filename));

####################################################################################################

def jsonStrategy(filePointer):
	result = json.load(filePointer);
	filePointer.close();
	return result;

def xmlStrategy(filePointer):
	tree = xml.parse(filePointer);
	root = tree.getroot();

	return parseXMLTree(root);

def parseXMLTree(node):

	# Base Case
	if len(node) == 0:
		if (node.text.isalpha()):
			return {node.tag : node.text};
		else:
			return {node.tag : float(node.text)};

	# Recursive Case
	children = list(node);
	toReturn = [];
	for child in children:
		toReturn.append(parseXMLTree(child));
	return {node.tag:toReturn};

####################################################################################################

class inputTest(unittest.TestCase):
	def testJSON(self):
		testFile = open("test.json", "w");
		testFile.write('''{"Shapes": [{"Triangle": [{"Point": [{"x": 0.0}, {"y": 1.0}]}, {"Point": 
			[{"x": -1.0}, {"y": 0.0}]}, {"Point": [{"x": 1.0}, {"y": 0.0}]}]}, {"Circle": 
			[{"Radius": 10.0}]}, {"Circle": [{"Radius": 12.0}]}, {"Ellipse": [{"SubMajorAxis": 3.0},
			 {"SubMinorAxis": 1.5}]}, {"Square": [{"Point": [{"x": 1.0}, {"y": 1.0}]}, {"Point": 
			 [{"x": -1.0}, {"y": 1.0}]}, {"Point": [{"x": -1.0}, {"y": -1.0}]}, {"Point": 
			 [{"x": 1.0}, {"y": -1.0}]}]}, {"Ellipse": [{"SubMinorAxis": 6.0}, 
			 {"SubMajorAxis": 7.3}]}, {"IsoscelesTriangle": [{"Point": [{"x": 0.0}, {"y": 0.0}]}, 
			 {"Point": [{"x": 1.0}, {"y": 5.0}]}, {"Point": [{"x": 2.0}, {"y": 0.0}]}]}]}''');
		testFile.close();
		testDict = {'Shapes': [{'Triangle': [{'Point': [{'x': 0.0}, {'y': 1.0}]}, {'Point': 
		[{'x': -1.0}, {'y': 0.0}]}, {'Point': [{'x': 1.0}, {'y': 0.0}]}]}, {'Circle': 
		[{'Radius': 10.0}]}, {'Circle': [{'Radius': 12.0}]}, {'Ellipse': [{'SubMajorAxis': 3.0}, 
		{'SubMinorAxis': 1.5}]}, {'Square': [{'Point': [{'x': 1.0}, {'y': 1.0}]}, {'Point': 
		[{'x': -1.0}, {'y': 1.0}]}, {'Point': [{'x': -1.0}, {'y': -1.0}]}, {'Point': [{'x': 1.0}, 
		{'y': -1.0}]}]}, {'Ellipse': [{'SubMinorAxis': 6.0}, {'SubMajorAxis': 7.3}]}, 
		{'IsoscelesTriangle': [{'Point': [{'x': 0.0}, {'y': 0.0}]}, {'Point': [{'x': 1.0}, 
		{'y': 5.0}]}, {'Point': [{'x': 2.0}, {'y': 0.0}]}]}]};	
		testFile = open("test.json", "r");	
		value = jsonStrategy(testFile);
		testFile.close();
		self.assertEqual(value, testDict);
		return;		

	def testXML(self):
		testFile = open("test.xml", "w");
		testFile.write('''<?xml version='1.0' encoding='us-ascii'?><Shapes><Triangle><Point><x>0</x>
		<y>1</y></Point><Point><x>-1</x><y>0</y></Point><Point><x>1</x><y>0</y></Point></Triangle>
		<Circle><Radius>10.0</Radius></Circle><Circle><Radius>12.0</Radius></Circle><Ellipse>
		<SubMajorAxis>3.0</SubMajorAxis><SubMinorAxis>1.5</SubMinorAxis></Ellipse><Square><Point><x>
		1</x><y>1</y></Point><Point><x>-1</x><y>1</y></Point><Point><x>-1</x><y>-1</y></Point>
		<Point><x>1</x><y>-1</y></Point></Square><Ellipse><SubMinorAxis>6.0</SubMinorAxis>
		<SubMajorAxis>7.3</SubMajorAxis></Ellipse><IsoscelesTriangle><Point><x>0</x><y>0</y></Point>
		<Point><x>1</x><y>5</y></Point><Point><x>2</x><y>0</y></Point></IsoscelesTriangle></Shapes>
		''');
		testDict = {'Shapes': [{'Triangle': [{'Point': [{'x': 0.0}, {'y': 1.0}]}, {'Point': 
		[{'x': -1.0}, {'y': 0.0}]}, {'Point': [{'x': 1.0}, {'y': 0.0}]}]}, {'Circle': 
		[{'Radius': 10.0}]}, {'Circle': [{'Radius': 12.0}]}, {'Ellipse': [{'SubMajorAxis': 3.0}, 
		{'SubMinorAxis': 1.5}]}, {'Square': [{'Point': [{'x': 1.0}, {'y': 1.0}]}, {'Point': 
		[{'x': -1.0}, {'y': 1.0}]}, {'Point': [{'x': -1.0}, {'y': -1.0}]}, {'Point': [{'x': 1.0}, 
		{'y': -1.0}]}]}, {'Ellipse': [{'SubMinorAxis': 6.0}, {'SubMajorAxis': 7.3}]}, 
		{'IsoscelesTriangle': [{'Point': [{'x': 0.0}, {'y': 0.0}]}, {'Point': [{'x': 1.0}, 
		{'y': 5.0}]}, {'Point': [{'x': 2.0}, {'y': 0.0}]}]}]};	
		testFile.close();
		testFile = open("test.xml", "r");
		self.assertEqual(xmlStrategy(testFile), testDict);
		testFile.close();
		return;


if __name__ == '__main__':
	unittest.main()
