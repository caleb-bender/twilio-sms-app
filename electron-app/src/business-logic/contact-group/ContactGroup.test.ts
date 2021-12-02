import ContactGroup from "./ContactGroup";


test("ContactGroup.validateContactGroupName validates correctly in all cases.", async () => {
    const result0 = (await ContactGroup.validateContactGroupName(undefined as unknown as string)).error?.message;
    const result1 = (await ContactGroup.validateContactGroupName("")).error?.message;
    const result2 = (await ContactGroup.validateContactGroupName("TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO LOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")).error?.message;
    const result3 = (await ContactGroup.validateContactGroupName("Not @llowed")).error?.message;
    const result4 = (await ContactGroup.validateContactGroupName("Valid Nam3")).error?.message;

    expect(result0).toBe("The contact group name is required.");
    expect(result1).toBe("The contact group name is required.");
    expect(result2).toBe("The contact group name must be no longer than 200 characters.");
    expect(result3).toBe("The contact group name can only contain letters, numbers, and spaces.");
    expect(result4).toBe(undefined);
});