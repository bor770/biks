I'm using NgRx for state management.

The state slices are:

- results: the actual data. Stored as an array of results, with a studentId in every result, and a record of all students, by id.

- data: the state of the data table: filter string, page index, selected row.

- analysis: the filters: ids and subjects.

- monitor: the filters: ids, names, failed (boolean) and passed (boolean).

All of the filtering is done in the selectors, the components only present the data and update the data and filters by dipatching actions.
