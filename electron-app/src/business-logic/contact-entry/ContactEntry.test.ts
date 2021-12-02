import ContactEntry from "./ContactEntry";

test("ContactGroup.validateContactEntry validates correctly in all cases.", async () => {
    const result0 = (await ContactEntry.validateContactEntry({})).error?.message;
    const result1 = (await ContactEntry.validateContactEntry({ firstName: "" })).error?.message;
    const result2 = (await ContactEntry.validateContactEntry({ firstName: "John" })).error?.message;
    const result3 = (await ContactEntry.validateContactEntry({ firstName: "John", lastName: "" })).error?.message;
    const result4 = (await ContactEntry.validateContactEntry({ firstName: "John", lastName: "Doe" })).error?.message;
    const result5 = (await ContactEntry.validateContactEntry({ firstName: "John", lastName: "Doe", phoneNumber: "" })).error?.message;
    const result6 = (await ContactEntry.validateContactEntry({ firstName: "Jo hn", lastName: "Doe", phoneNumber: "1234567890" })).error?.message;
    const result7 = (await ContactEntry.validateContactEntry({ firstName: "John", lastName: "Do e", phoneNumber: "1234567890" })).error?.message;
    const result8 = (await ContactEntry.validateContactEntry({ firstName: "John", lastName: "Doe", phoneNumber: "hello" })).error?.message;
    const result9 = (await ContactEntry.validateContactEntry({ firstName: "John", lastName: "Doe", phoneNumber: "12345678900" })).error?.message;
    const result10 = (await ContactEntry.validateContactEntry({ firstName: "John", lastName: "Doe", phoneNumber: "1234567890" })).error?.message;

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