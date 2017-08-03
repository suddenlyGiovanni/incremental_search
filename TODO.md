1. input event (text field)
   - if field value has no length, hide results
   - find matches
   - limit matches to four
   - loop through matches and build html string
   - if no matches, html string contains no results message
   - insert html string into dom
2. mouse enter (single result)
   - add highlight class to result
   - remove highlight class from previously highlighted result
3. click (single result)
   - result text appears in text field
   - results disappear
4. keydown (input)
   - if the key is down arrow
     - if no result is selected, add highlight to first result
     - if a result other than the last result is highlighted, remove highlight from highlighted result and add to next
   - if the key is arrow up
     - if no result is selected, add highlight to last result
     - if a result other than first is selected, remove highlight from highlighted results and add to previous
   - if the key is enter
     - highlighted result text appears in text field
     - results disappear
5. blur on field or mousedown on document
   - results disappear
6. focus on field
   - matching results reappear
