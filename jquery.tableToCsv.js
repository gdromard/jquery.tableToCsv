/* ===========================================================
 * jquery.tableToCsv.js v1.0
 * ===========================================================
 * jQuery Table to Excel Plugin
 * Copyright 2012 Gabriel Dromard
 *
 * @see https://github.com/gdromard/jquery.tableToCsv for more details
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
(function ($) {
  $.tableToCsv = {
		version: "1.0",
		separator: ',',
		uri: 'data:text/csv;charset=utf-8;base64,',
		base64: function(s) { return window.btoa(unescape(encodeURIComponent(s))); },
	};

	$.fn.extend({
		tableToCsv: function(options) {
			options = $.extend({ separator: ','}, options);
			return $(this).each(function() {
				var csvLines = [];
				// For each lines
				$(this).filter(':visible').find('tr').each(function(lineindex) {
					var csvLine = [];
					// Handle columns
					$(this).filter(':visible').find('th, td').each(function(colindex) {
						if ($(this).css('display') != 'none') {
							csvLine[colindex] = '"' + $(this).text().replace(/["]/g, "“") + '"'; // replace " with “
							csvLines[lineindex] = csvLine.join(options.separator);
						}
					});
				});
				window.location.href = $.tableToCsv.uri + $.tableToCsv.base64(csvLines.join('\n'));
			});
		}
	});
}(window.jQuery));
