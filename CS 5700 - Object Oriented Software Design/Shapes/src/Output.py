# Jonathan Petersen
# A01236750
# Shapes Assignment
# Output Class

import collections
import json
import os
import types
import pprint
import xml.etree.ElementTree as xml

class Output:
	def __init__(self):
		self.strategy = stdoutStrategy;
		return;

	def __init__(self, strategy):
		self.strategy = strategy;
		return;

	def writeFile(self, dict):
		self.strategy(dict);
		return;

def stdoutStrategy(dict):
	pp = pprint.PrettyPrinter();
	pp.pprint(dict);
	return;

def csvStrategy(dict):
	file = open("results.csv", "w")
	for key, value in dict.items():
		file.write(str(key) + "," + repr(value) + "\n");
	file.close();
	return;

def jsonStrategy(dict):
	file = open("results.json", "w");
	json.dump(dict, file, 
		indent=2
		);
	file.close();
	return;

def xmlStrategy(dict):
	file = open("results.xml", "w");
	tree = xml.ElementTree();
	root = buildXMLTree(dict);
	tree._setroot(root);
	tree.write(file, encoding="unicode", xml_declaration=True);

	return;

def buildXMLTree(dict):

	# Base Case
	if (dict.__len__() <= 1):
		for key, value in dict.items():
			elem = xml.Element(key);
			elem.text = repr(value);
		return elem;

	# Recursive Case
	root = xml.Element("Shapes");
	for key, value in dict.items():
		elem = xml.Element(key);
		if isinstance(value, list):
			for item in value:
				elem.append(buildXMLTree(item));
			root.append(elem);
		else:
			elem.append(buildXMLTree(value));
			root.append(elem);
	return root;

