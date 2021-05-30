import React, { ChangeEvent, useCallback } from "react";
import { Box, makeStyles, Tab, Tabs } from "@material-ui/core";
import { usePage } from "../../state/page.state";
import { useKey } from "../../hooks/useKey";
import { useTabDisabledValue } from "../../state/keys.state";
import { useIsMenuVisible } from "../../state/visibility.state";

const useStyles = makeStyles({
  tab: {
    minWidth: "100px",
  },
});

export const PageTabs: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = usePage();
  const tabDisabled = useTabDisabledValue();
  const visible = useIsMenuVisible();

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setPage(newValue);
  };

  const handleTabPress = useCallback(() => {
    if (tabDisabled || !visible) return;
    setPage((prevState) => (prevState + 1 > 2 ? 0 : prevState + 1));
  }, [tabDisabled, visible]);

  useKey("Tab", handleTabPress);

  return (
    <Box width="100%">
      <Tabs
        value={page}
        centered
        indicatorColor="primary"
        textColor="secondary"
        onChange={handleChange}
      >
        <Tab className={classes.tab} label="Main" wrapped disableFocusRipple />
        <Tab
          className={classes.tab}
          label="Players"
          wrapped
          disableFocusRipple
        />
        <Tab
          className={classes.tab}
          label="txAdmin"
          wrapped
          disableFocusRipple
        />
      </Tabs>
    </Box>
  );
};
