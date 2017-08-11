<?php

class pluginWoofmark extends Plugin {

	private $loadOnController = array(
		'new-post',
		'new-page',
		'edit-post',
		'edit-page'
	);
	
	public function init() {
		$this->dbFields = array(
			'defaultMode'=>'markdown',
			'modeMarkdown'=>'true',
			'modeHTML'=>'true',
			'modeWYSIWYG'=>'true',
			'rememberMode'=>'false'
		);
	}
	
	public function form() {
		global $Language;
		
		$html  = '';
		
		$html  = '<div>';
		$html .= '<label>'.$Language->get('Default Mode').'</label>';
		$html .= '<select name="defaultMode">';
		$html .= '<option value="markdown" '.($this->getDbField('defaultMode')==='markdown'?'selected':'').'>Markdown</option>';
		$html .= '<option value="html" '.($this->getDbField('defaultMode')==='html'?'selected':'').'>HTML</option>';
		$html .= '<option value="wysiwyg" '.($this->getDbField('defaultMode')==='wysiwyg'?'selected':'').'>WYSIWYG</option>';
		$html .= '</select>';
		$html .= '</div>';
		
		return $html;
	}

	public function adminHead()
	{
		global $layout;
		
		if (in_array($layout['controller'], $this->loadOnController)) {
			$html = '';
			
			// Plugin path
			$pluginPath = $this->htmlPath();

			// woofmark css
			$html .= '<link rel="stylesheet" type="text/css" href="'.$pluginPath.'css/woofmark.min.css">';
			$html .= '<link rel="stylesheet" type="text/css" href="'.$pluginPath.'css/bludit.css">';

			return $html;
		}

		return false;
	}

	public function adminBodyEnd()
	{
		global $layout;
		
		if (in_array($layout['controller'], $this->loadOnController)) {
			$html = '';
			
			// Plugin path
			$pluginPath = $this->htmlPath();
			
			// Load woofmark
			$html .= '<script src="'.$pluginPath.'js/domador.min.js" ></script>';
			$html .= '<script src="'.$pluginPath.'js/megamark.min.js" ></script>';
			$html .= '<script src="'.$pluginPath.'js/woofmark.min.js" ></script>';
			
			// Create a woofmark instance
			$html .= '<script>'.PHP_EOL;
			$html .= 'var wm = woofmark(document.querySelector("#jscontent"), {';
			$html .= '	parseMarkdown: megamark,';
			$html .= '	parseHTML: domador,';
			$html .= '	defaultMode: "'.$this->getDbField('defaultMode').'",';
			$html .= '	storage: '.$this->getDbField('rememberMode').'';
			$html .= '});';
			$html .= '</script>'.PHP_EOL;
			
			$html .= '<script src="'.$pluginPath.'js/load.js" ></script>';
			
			return $html;
		}

		return false;
	}
}