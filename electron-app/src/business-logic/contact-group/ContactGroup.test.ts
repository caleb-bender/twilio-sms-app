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


test("ContactGroup.validateContactEntry validates correctly in all cases.", async () => {
    const result0 = (await ContactGroup.validateContactEntry({})).error?.message;
    const result1 = (await ContactGroup.validateContactEntry({ firstName: "" })).error?.message;
    const result2 = (await ContactGroup.validateContactEntry({ firstName: "John" })).error?.message;
    const result3 = (await ContactGroup.validateContactEntry({ firstName: "John", lastName: "" })).error?.message;
    const result4 = (await ContactGroup.validateContactEntry({ firstName: "John", lastName: "Doe" })).error?.message;
    const result5 = (await ContactGroup.validateContactEntry({ firstName: "John", lastName: "Doe", phoneNumber: "" })).error?.message;
    const result6 = (await ContactGroup.validateContactEntry({ firstName: "Jo hn", lastName: "Doe", phoneNumber: "1234567890" })).error?.message;
    const result7 = (await ContactGroup.validateContactEntry({ firstName: "John", lastName: "Do e", phoneNumber: "1234567890" })).error?.message;
    const result8 = (await ContactGroup.validateContactEntry({ firstName: "John", lastName: "Doe", phoneNumber: "hello" })).error?.message;
    const result9 = (await ContactGroup.validateContactEntry({ firstName: "John", lastName: "Doe", phoneNumber: "12345678900" })).error?.message;
    const result10 = (await ContactGroup.validateContactEntry({ firstName: "John", lastName: "Doe", phoneNumber: "1234567890" })).error?.message;

    expect(result0).toBe("The first name is required.");
    expect(result1).toBe("The first name is required.");
    expect(result2).toBe("The last name is required.");
    expect(result3).toBe("The last name is required.");
    expect(result4).toBe("The phone number is required.");
    expect(result5).toBe("The phone number is required.");
    expect(result6).toBe("The first name cannot contain spaces.");
    expect(result7).toBe("The last name cannot contain spaces.");
    expect(result8).toBe("The phone number must be exactly 10 digits long.");
    expect(result9).toBe("The phone number must be exactly 10 digits long.");
    expect(result10).toBe(undefined);
});