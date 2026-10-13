import { useEffect, useMemo, useRef, useState } from "react";
import type { InboxCollection, InboxItem } from "../inbox-data";
import { mockInboxItems } from "../inbox-data";
import { InboxHeader } from "./inbox-header";
import { InboxItemDialog } from "./inbox-item-dialog";
import { InboxList } from "./inbox-list";

export function InboxPage() {
  const [collection, setCollection] = useState<InboxCollection>("active");
  const [displayedCollection, setDisplayedCollection] =
    useState<InboxCollection>("active");
  const [isListVisible, setIsListVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleItems = useMemo(
    () =>
      mockInboxItems.filter((item) => item.collection === displayedCollection),
    [displayedCollection],
  );

  useEffect(
    () => () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    },
    [],
  );

  function handleCollectionChange(nextCollection: InboxCollection) {
    if (nextCollection === collection) {
      return;
    }

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setCollection(nextCollection);
    setIsListVisible(false);

    transitionTimerRef.current = setTimeout(() => {
      setDisplayedCollection(nextCollection);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsListVisible(true));
      });
    }, 180);
  }

  return (
    <>
      <InboxHeader
        collection={collection}
        onCollectionChange={handleCollectionChange}
      />
      <InboxList
        isVisible={isListVisible}
        items={visibleItems}
        onOpenItem={setSelectedItem}
      />
      <InboxItemDialog
        item={selectedItem}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedItem(null);
          }
        }}
      />
    </>
  );
}
