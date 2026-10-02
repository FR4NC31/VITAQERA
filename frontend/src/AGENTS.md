# Style formatting

For all components and screens, write style objects with two-space indentation,
one property per line, and a blank line between named styles. Use single quotes
for string values in styles and trailing commas. Expand nested style objects
and dynamic inline style objects using the same format.

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Keep this convention when adding or updating components and screens.
